import React from "react";
import CrudModal from "../modals/crudModal";
import { toast } from "react-toastify";
import ViewModal from "../modals/viewModal";
import {
  handleDataFromGrandchild,
  closeModal,
  closeViewModal,
  closeLabelModal,
  handleCreate,
  handleUpdate,
} from "../../utils/crudFunctions";

const CrudModals = ({
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
}) => (
  <>
    <CrudModal
      isOpen={isAddModalOpen}
      onRequestClose={() => closeModal(setSelectedItem, setIsAddModalOpen)}
      selectedItem={selectedItem}
      action={action}
      entity={rdata.path}
      schema={rdata.schema}
      onDataFromGrandchild={(data) =>
        handleDataFromGrandchild(
          data,
          setDataFromGrandchild,
          (formData) =>
            handleCreate(formData, createResource, closeModal(setSelectedItem, setIsAddModalOpen), refetch),
          (formData) =>
            handleUpdate(formData, editResource, closeViewModal(setSelectedItem, setIsEditModalOpen), refetch),
          toast
        )
      }
     rdata={rdata}

    />

    <CrudModal
      isOpen={isEditModalOpen}
      onRequestClose={() => closeViewModal(setSelectedItem, setIsEditModalOpen)}
      selectedItem={selectedItem}
      action={action}
      entity={rdata.path}
      schema={rdata.schema}
      rdata={rdata}
      onDataFromGrandchild={(data) =>
        handleDataFromGrandchild(
          data,
          setDataFromGrandchild,
          (formData) =>
            handleCreate(formData, createResource, closeModal(setSelectedItem, setIsAddModalOpen), refetch),
          (formData) =>
            handleUpdate(formData, editResource, closeViewModal(setSelectedItem, setIsEditModalOpen), refetch),
          toast
        )
      }
    />

    <ViewModal
      isOpen={isViewModalOpen}
      onRequestClose={() =>
        closeLabelModal(setSelectedItem, setIsViewModalOpen)
      }
      selectedItem={selectedItem}
      schema={rdata.schema}
    />
  </>
);

export default CrudModals;
