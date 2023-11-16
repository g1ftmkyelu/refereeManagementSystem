import React, { useEffect, useState } from "react";
import {
  useFetchAllResources,
  useDeleteResource,
  useCreateResource,
  useUpdateResource,
} from "../../utils/getAPI";
import { toast } from "react-toastify";
import Table from "../crudComponents/Table";
import Loader from "../specialRenderComponents/Loader";
import CrudModals from "../coreComponents/CrudModals";
import CardGrid from "./CardGrid";

import {
  openCrudEditModal,
  openCrudAddModal,
  closeViewModal,
  openCrudViewModal,
  handleDelete,
} from "../../utils/crudFunctions";
import { FaBoxes, FaList } from "react-icons/fa";
import { BiGrid, BiListUl, BiPlus } from "react-icons/bi";
import { CrudAddButton } from "./CrudButtons";
import { changeNumColumns } from "../../../../Redux/slices/gridColumnThunk";
import { useSelector, useDispatch } from 'react-redux';
import { CiBoxList, CiGrid32 } from "react-icons/ci";

const CrudGrid = ({ rdata, stausCaption }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataFromGrandchild, setDataFromGrandchild] = useState("");
  const [edit, setEdit] = useState();
  const [searchInput, setSearchInput] = useState("");

  const numColumns = useSelector((state) => state.numColumns);
  const dispatch = useDispatch();


  const deleteResource = useDeleteResource(rdata.path, rdata.dataSource);
  const createResource = useCreateResource(rdata.path, rdata.dataSource);
  const editResource = useUpdateResource(rdata.path, rdata.dataSource);

  let { data, isLoading, error, refetch } = useFetchAllResources(
    rdata.path,
    rdata.dataSource
  );

  useEffect(() => {
    console.log(data);
  });



  const handleFilter = (value) => {
    setSearchInput(value);
    data = data.filter(
      (item) => item.name.toLowerCase().includes(searchInput.toLowerCase()) // Replace "name" with the property you want to search
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>

          <div className="px-24 py-10">
            <div
              style={{
                display: "flex",
                alignContent: "center",
                paddingBottom: "15px",
              }}
            >
              <input
                style={{ width: "95%" }}
                type="text"
                placeholder="Search..." // Step 2: Add a search input
                className=" border-none rounded-lg"
                onChange={(e) => { handleFilter(e.target.value) }} // Step 3: Update the search input state
              />

              {numColumns != 1 ?
                <button className="bg-blue-500 text-white p-4 rounded-md font-extrabold ml-2" onClick={() => dispatch(changeNumColumns(1))}>
                  <FaList />
                </button> :

                <button className="bg-blue-500 text-white p-4 rounded-md font-extrabold ml-2" onClick={() => dispatch(changeNumColumns(3))}>
                  <FaBoxes />
                </button>

              }


              <CrudAddButton
                {...{
                  openCrudAddModal: () =>
                    openCrudAddModal(
                      setAction,
                      setEdit,
                      setSelectedItem,
                      setIsAddModalOpen
                    ),
                }}
              />
            </div>

            <CardGrid
              {...{
                rdata,
                data,
                numColumns,
                openCrudViewModal: (item) =>
                  openCrudViewModal(
                    item,
                    setSelectedItem,
                    setIsViewModalOpen
                  ),
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
              }}
            />
          </div>


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
      )}
    </>
  );
};

export default CrudGrid;
