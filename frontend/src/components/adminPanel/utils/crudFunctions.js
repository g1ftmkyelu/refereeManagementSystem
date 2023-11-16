import Swal from 'sweetalert2'; 

export const handleDataFromGrandchild = (data, setDataFromGrandchild, handleCreate, handleUpdate, toast) => {
  try {
    console.log('mydata:', data);
    setDataFromGrandchild(data);
    if (data.action === 'add') {
      handleCreate(data.mydata);
      toast.success('Item added successfully', { position: 'top-right' });
    } else if (data.action === 'edit') {
      handleUpdate(data.mydata);
      toast.success('Item updated successfully', { position: 'top-right' });
    } else {
      toast.error('Something went wrong', { position: 'top-right' });
    }
  } catch (error) {
    toast.error(error.message, { position: 'top-right' });
  }
};

export const openCrudEditModal = (item, setAction, setEdit, setSelectedItem, setIsEditModalOpen) => {
  setAction('edit');
  setEdit(false);
  setSelectedItem(item);
  setIsEditModalOpen(true);
};

export const openCrudAddModal = (setAction, setEdit, setSelectedItem, setIsAddModalOpen) => {
  setAction('add');
  setEdit(true);
  setSelectedItem({});
  setIsAddModalOpen(true);
};

export const closeModal = (setSelectedItem, setIsAddModalOpen) => {
  setSelectedItem(null);
  setIsAddModalOpen(false);
};

export const closeViewModal = (setSelectedItem, setIsEditModalOpen) => {
 // setSelectedItem(null);
  setIsEditModalOpen(false);
};

export const openCrudViewModal = (item, setSelectedItem, setIsViewModalOpen) => {
  setSelectedItem(item);
  setIsViewModalOpen(true);
};

export const closeLabelModal = (setSelectedItem, setIsViewModalOpen) => {
  setSelectedItem(null);
  setIsViewModalOpen(false);
};

export const handleDelete = async (itemId, deleteResource, refetch, toast) => {
  try {
    const result = await Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      await deleteResource.mutateAsync(itemId);
      await refetch();
      toast.success('Item deleted successfully', { position: 'top-right' });
    } else {
      Swal.fire('Cancelled', 'The item was not deleted.', 'info');
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    toast.error('Error deleting item', { position: 'top-right' });
  }
};

export const handleCreate = async (formData, createResource, closeModal = () => {}, refetch = async () => {}) => {
  try {
    // Use the formData to create a new item
    const createdItem = await createResource.mutateAsync(formData);
    closeModal();
    await refetch();
    console.log('New item created:', createdItem);
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

export const handleCreateAlt = async (formData, createResource) => {
  try {
    // Use the formData to create a new item
    const createdItem = await createResource.mutateAsync(formData);
  
    console.log('New item created:', createdItem);
  } catch (error) {
    console.error('Error creating item:', error);
  }
};


export const handleUpdate = async (formData, editResource, closeViewModal, refetch) => {
  try {
    // Use the formData to create a new item
    const editedItem = await editResource.mutateAsync(formData);
    closeViewModal();
    await refetch();
    console.log('Item edited:', editedItem);
  } catch (error) {
    console.error('Error editing item:', error);
  }
};

export const handleSwitchStatus = async (item, editResource, closeViewModal, refetch, toast) => {
  try {
    await editResource.mutateAsync(item);
    closeViewModal();
    await refetch();
    toast.success('Item status changed successfully', { position: 'top-right' });
  } catch (error) {
    toast.error(`Error: ${error.message}`, { position: 'top-right' });
  }
};
