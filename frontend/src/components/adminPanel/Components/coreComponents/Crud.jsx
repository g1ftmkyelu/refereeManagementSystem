import React, { useState, useEffect } from "react";
import { useFetchAllResources, useDeleteResource, useCreateResource, useUpdateResource, useFetchFilteredResources } from "../../utils/getAPI";
import { toast } from "react-toastify";
import Table from "../crudComponents/Table";
import Loader from "../specialRenderComponents/Loader";
import CrudModals from './CrudModals';
import { openCrudEditModal, openCrudAddModal, closeViewModal, openCrudViewModal, handleDelete, handleSwitchStatus } from "../../utils/crudFunctions";
import NoData from './NoData';

const Crud = ({ rdata, stausCaption }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataFromGrandchild, setDataFromGrandchild] = useState("");
  const [edit, setEdit] = useState();
  const deleteResource = useDeleteResource(rdata.path, rdata.dataSource);
  const createResource = useCreateResource(rdata.path, rdata.dataSource);
  const editResource = useUpdateResource(rdata.path, rdata.dataSource);


  let data, isLoading, error, refetch;

  if (rdata.fetchDataByQuery) {
    const result = useFetchFilteredResources(
      rdata.path,
      rdata.dataSource,
      rdata.queryField,
      rdata.queryValue
    )

    console.log(result);

    data = result.data;
    isLoading = result.isLoading;
    error = result.error;
    refetch = result.refetch;
  } else {
    const result = useFetchAllResources(rdata.path, rdata.dataSource);

    data = result.data;
    isLoading = result.isLoading;
    error = result.error;
    refetch = result.refetch;
  }

  useEffect(() => {
    console.log(rdata.path, rdata.dataSource);
    console.log(rdata.schema);
  }, [data]); // Include data as a dependency for the useEffect

  return (
    <>
      {isLoading ||createResource.isLoading || editResource.isLoading || deleteResource.isLoading ? (
        <Loader />
      ) : error || createResource.error || editResource.error || deleteResource.error? (
        <div>
          <p>Error: {error.message}</p>
        </div>
      ) : (
        <div className="mx-10">
          <Table
            {...{
              rdata,
              data,
              openCrudAddModal: () =>
                openCrudAddModal(
                  setAction,
                  setEdit,
                  setSelectedItem,
                  setIsAddModalOpen
                ),
              openCrudViewModal: (item) =>
                openCrudViewModal(item, setSelectedItem, setIsViewModalOpen),
              openCrudEditModal: (item) =>
                openCrudEditModal(
                  item,
                  setAction,
                  setEdit,
                  setSelectedItem,
                  setIsEditModalOpen
                ),
              handleDelete: (itemId) =>
                handleDelete(itemId, deleteResource, refetch, toast),
              statusCaption: stausCaption,
              handleSwitchStatus: (item) =>
                handleSwitchStatus(
                  item,
                  editResource,
                  closeViewModal,
                  refetch,
                  toast
                ),
            }}
          />
        </div>
      )}
  
      <CrudModals
        {...{
          isAddModalOpen,
          setSelectedItem,
          setIsAddModalOpen,
          selectedItem,
          action,
          rdata,
          setDataFromGrandchild,
          createResource,
          refetch,
          editResource,
          isEditModalOpen,
          setIsEditModalOpen,
          isViewModalOpen,
          setIsViewModalOpen,
        }}
      />
    </>
  );
  
};

export default Crud;
