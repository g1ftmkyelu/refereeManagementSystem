import React, { useEffect, useState } from 'react';
import DynamicForm from './dynamicForm';
import { useFetchFilteredResources } from '../../utils/getAPI';
import Loader from './Loader';
import { closeModal, closeViewModal, handleCreate, handleDataFromGrandchild, handleUpdate } from '../../utils/crudFunctions';
import {toast} from 'react-toastify';
import { useUpdateResource } from '../../utils/getAPI';
import axios from 'axios'; 
import { getToken, removeToken } from '../../utils/helperFunctions';
const api = axios.create({
    baseURL: 'http://localhost:3030', // Replace with your API base URL
  });

const Singleton = ({ rdata }) => {
    const [dataFromGrandchild, setDataFromGrandchild] = useState("");
    const editResource=useUpdateResource(rdata.path, rdata.dataSource)
    const [selectedItem, setSelectedItem] = useState(null);
    const [isViewModalOpen, setIsEditModalOpen] = useState(false);
    const { data, isLoading, refetch } = useFetchFilteredResources(
        rdata.path,
        rdata.dataSource,
        rdata.queryField,
        rdata.queryValue
    )
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      async function fetchUser() {
        try {
          const accessToken = getToken();
          api.defaults.headers.Authorization = `Bearer ${accessToken}`;
          const response = await api.get('/user');
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
                <div>
                    
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
                      
                
                    } data={userData} action={'edit'} />
                </div>

            }
        </>
    );
}

export default Singleton;
