import React, { useEffect, useState } from 'react';
import DynamicForm from './dynamicForm';
import { useCreateResource, useFetchAllResources, useFetchFilteredResources } from '../../utils/getAPI';
import Loader from './Loader';
import { closeModal, closeViewModal, handleCreate, handleDataFromGrandchild, handleUpdate } from '../../utils/crudFunctions';
import { toast } from 'react-toastify';
import { useUpdateResource } from '../../utils/getAPI';
import axios from 'axios';
import { getToken, removeToken } from '../../utils/helperFunctions';

const Singleton = ({ rdata }) => {
  const api = axios.create({
    baseURL: rdata.dataSource, // Replace with your API base URL
  });
  const [dataFromGrandchild, setDataFromGrandchild] = useState("");
  const editResource = useUpdateResource(rdata.path, rdata.dataSource)
  const createResource = useCreateResource(rdata.path, rdata.dataSource);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data, isLoading, refetch } = useFetchAllResources(
    rdata.path,
    rdata.dataSource,

  )
  const [userData, setUserData] = useState(null);

  const myId=rdata.id?rdata.id:""
  const accessToken = getToken();

  useEffect(() => {
    async function fetchUser() {
      try {
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        const response = await api.get();
        setUserData({ ...response.data });
      } catch (e) {
        console.log(e);
        removeToken();
      }
    }

    fetchUser();
  }, []);

  console.log(userData)
  return (
    <>
      {isLoading ?
        <Loader /> :
        <div className='overflow-scroll  m-10'>

          <DynamicForm schema={rdata.schema} onDataFromGrandchild={
            (data) =>
              handleDataFromGrandchild(
                data,
                setDataFromGrandchild,
                (formData) =>
                  handleCreate(formData, createResource, closeModal(setSelectedItem, setIsAddModalOpen), refetch),
                (formData) =>
                  handleUpdate(formData, editResource, closeViewModal(setSelectedItem, setIsEditModalOpen), refetch),
                toast
              )


          } data={userData} action={rdata.addResource ? "add" : "edit"} rdata={rdata} />
        </div>

      }
    </>
  );
}

export default Singleton;
