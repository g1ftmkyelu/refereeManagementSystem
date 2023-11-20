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
  const [filteredData, setFilteredData] = useState([]);

  const deleteResource = useDeleteResource(rdata.path, rdata.dataSource);
  const createResource = useCreateResource(rdata.path, rdata.dataSource);
  const editResource = useUpdateResource(rdata.path, rdata.dataSource);

  let { data, isLoading, error, refetch } = useFetchAllResources(
    rdata.path,
    rdata.dataSource
  );

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => {
        // Iterate through the keys of each item and check for a match
        for (const key in item) {
          if (
            item[key] &&
            typeof item[key] === 'string' && // Check if the value is a string
            item[key].toLowerCase().includes(searchInput.toLowerCase())
          ) {
            return true; // Return true if the value includes the search input
          }
        }
        return false; // Return false if no match is found in any field
      });
      setFilteredData(filtered);
    }
  }, [data, searchInput]);




  const handleFilter = (value) => {
    setSearchInput(value);
    data = data.filter(
      (item) => item.name.toLowerCase().includes(searchInput.toLowerCase()) // Replace "name" with the property you want to search
    );
  };

  return (
    <>
      {isLoading || createResource.isLoading || editResource.isLoading || deleteResource.isLoading ? (
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
              className="bg-white p-5 mb-4 shadow-md rounded-lg"
            >
              <input
                style={{ width: "95%" }}
                type="text"
                placeholder={`Search ${rdata.path}...`}
                className="border-none rounded-lg px-5 font-extrabold bg-slate-200"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              {numColumns != 1 ?
                <button className="bg-blue-500 text-white p-4 rounded-md font-extrabold ml-2" onClick={() => dispatch(changeNumColumns(1))}>
                  <FaList />
                </button> :

                <button className="bg-blue-500 text-white p-4 rounded-md font-extrabold ml-2" onClick={() => dispatch(changeNumColumns(3))}>
                  <FaBoxes />
                </button>

              }

              {rdata.add &&

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
              }
            </div>

            <CardGrid
              {...{
                rdata,
                data: filteredData, // Use filteredData instead of data
                numColumns,
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
