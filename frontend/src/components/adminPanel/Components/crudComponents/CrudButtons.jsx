import React from "react";
import { FaEye, FaPlus, FaEdit, FaTrash, FaExchangeAlt } from "react-icons/fa";

// CrudAddButton
export const CrudAddButton = ({ openCrudAddModal }) => (
  <button
    onClick={openCrudAddModal}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-md mx-1  flex content-center justify-center"
  >
    <FaPlus /> Add
  </button>
);

// CrudViewButton
export const CrudViewButton = ({ openCrudViewModal, item }) => (
  <button
    onClick={() => openCrudViewModal(item)}
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mx-1  flex content-center justify-center"
  >
    <FaEye />
  </button>
);

// CrudEditButton
export const CrudEditButton = ({ openCrudEditModal, item }) => (
  <button
    onClick={() => openCrudEditModal(item)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md mx-1  flex content-center justify-center"
  >
    <FaEdit />
  </button>
);

// CrudDeleteButton
export const CrudDeleteButton = ({ handleDelete, item }) => (
  <button
    onClick={() => handleDelete(item.id)}
    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md  mx-1  flex content-center justify-center"
  >
    <FaTrash />
  </button>
);

// CrudSwitchStatus
export const CrudSwitchStatus = ({ handleSwitchStatus, item, name, Icon }) => {
  const handleSwitch = () => {
    const updatedItem = { ...item, status: name };
    handleSwitchStatus(updatedItem);
  };

  return (
    <button
      className="crud-button switch-status bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md"
      onClick={handleSwitch}
    >
      <Icon />
    </button>
  );
};
