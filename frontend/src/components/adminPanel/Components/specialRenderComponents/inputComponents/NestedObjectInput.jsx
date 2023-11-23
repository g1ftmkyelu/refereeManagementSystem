import React, { useState, useEffect } from 'react';

const DynamicCRUD = ({ schema, nestedData, onSubmit }) => {
  const [editedData, setEditedData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [newData, setNewData] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const customStyles = {
    content: {
      width: "50vw"
    },
    overlay: {
      position: "fixed",
      inset: "0",
      zIndex: " 50",
      display: "flex",
      alignItems: "center",
      justifyContent: " center",
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    }

  };


  const handleNestedDataUpdate = (updatedNestedData, index) => {
    const updatedData = [...editedData];
    updatedData[index].nestedData = updatedNestedData;
    setEditedData(updatedData);

    // Pass the updatedData back to the parent component
    onSubmit(updatedData);
  };


  useEffect(() => {
    setEditedData([...nestedData]);
  }, [nestedData]);



  const openModal = (index) => {
    setSelectedItemIndex(index);
    setShowModal(true);
    setModalData({ ...editedData[index] });
  };

  const closeModal = () => {
    setSelectedItemIndex(null);
    setShowModal(false);
    setModalData({});
  };

  const handleModalChange = (key, value) => {
    setModalData({
      ...modalData,
      [key]: value,
    });
  };

  const handleModalSubmit = () => {
    // Log the data before updating state
    console.log("Modal Data before submission: ", modalData);

    const updatedData = [...editedData];
    updatedData[selectedItemIndex] = { ...modalData };
    setEditedData(updatedData);
    onSubmit(updatedData); // Pass updatedData back to the parent component
    closeModal();
  };



  const handleNewDataChange = (key, value) => {
    setNewData({
      ...newData,
      [key]: value,
    });
  };

  const handleAddData = () => {
    const updatedData = [...editedData, newData];
    setEditedData(updatedData);
    setNewData({});

    // Pass the updated data back to the parent component
    onSubmit(updatedData);
  };





  const renderModalFields = () => {
    return schema.map((field) => (
      <div key={field.name} className="mb-4">
        {field.type !== 'object' ? (
          <div>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.title}
            </label>
            <input
              id={field.name}
              type={field.type}
              value={modalData[field.name] || ''}
              onChange={(e) => handleModalChange(field.name, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        ) : (
          <div key={field.name}>
            <h4 className="text-lg font-medium text-gray-800">{field.title}</h4>
            <DynamicCRUD
              schema={field.schema}
              nestedData={modalData[field.name] || []}
              onSubmit={(updatedNestedData) => {
                const updatedModalData = { ...modalData };
                updatedModalData[field.name] = updatedNestedData;
                setModalData(updatedModalData);
                handleNestedDataUpdate(updatedNestedData, selectedItemIndex);
              }}
            />
          </div>
        )}
      </div>
    ));
  };


  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    const updatedData = [...editedData];
    updatedData.splice(deleteIndex, 1);
    setEditedData(updatedData);
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteIndex(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-8">
        <button
          onClick={() => setShowAddModal(true)} // Set showModal to true when the button is clicked
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add
        </button>
      </div>
      <table className="border-collapse border border-gray-400">

        <thead>
          <tr>
            {schema.map(
              (field) =>
                field.type !== 'object' && (
                  <th key={field.name} className="border border-gray-400 p-2">
                    {field.title}
                  </th>
                )
            )}
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {editedData.map((item, index) => (
            <tr key={index}>
              {schema.map(
                (field) =>
                  field.type !== 'object' && (
                    <td key={`${field.name}-${index}`} className="border border-gray-400 p-2">
                      {item[field.name] || ''}
                    </td>
                  )
              )}
              <td className="border border-gray-400 p-2">
                <button
                  onClick={() => openModal(index)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 h-72 overflow-y-auto flex flex-col justify-center items-center">
            <span
              className="absolute top-0 right-0 m-3 text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h3 className="text-lg font-semibold mb-4">Add/Edit Data</h3>
            <div className="overflow-y-auto p-4">
              {/* Apply overflow-y to this div to enable scrolling */}
              {renderModalFields()}
            </div>
            <button
              onClick={handleModalSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Save
            </button>
          </div>
        </div>

      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete?</h3>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}




      {/* Add modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <span
              className="absolute top-0 right-0 m-3 text-xl cursor-pointer"
              onClick={() => setShowAddModal(false)} // Close the Add modal when the close button is clicked
            >
              &times;
            </span>
            <h3 className="text-lg font-semibold mb-4 text-center">Add Data</h3>
            {/* Form for adding new data */}
            <div className="flex flex-col">
              {schema.map((field) => {
                if (field.type !== 'object' && field.type !== 'array') {
                  return (
                    <div key={field.name} className="mb-4">
                      <label htmlFor={field.name} className="mb-1">
                        {field.title}
                      </label>
                      <input
                        id={field.name}
                        type={field.type}
                        value={newData[field.name] || ''}
                        onChange={(e) => handleNewDataChange(field.name, e.target.value)}
                        className="border border-gray-400 p-2 rounded w-full"
                      />
                    </div>
                  );
                }
                return null; // Skip rendering for object, array, or nested fields
              })}
              {/* Add button */}
              <button
                onClick={() => {
                  handleAddData();
                  setShowAddModal(false); // Close the Add modal after adding data
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded self-center"
              >
                Add Data
              </button>
            </div>
          </div>
        </div>

      )}


    </div>
  );
};

export default DynamicCRUD;
