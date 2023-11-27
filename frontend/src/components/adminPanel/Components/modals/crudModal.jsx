import React, { useState } from 'react';
import Modal from 'react-modal';
import DynamicForm from '../specialRenderComponents/dynamicForm';
import { FaTimes } from 'react-icons/fa';

const AddModal = ({ isOpen, onRequestClose, selectedItem, action, entity, schema, onDataFromGrandchild, rdata }) => {

  const customStyles = {
    content: {
      maxWidth: '900px',
      maxHeight: '900px',
      margin: 'auto',
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



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      ariaHideApp={false}
      style={customStyles}
    >
      <div onClick={onRequestClose}>
        <FaTimes style={{ float: 'right' }} size={30} />
      </div>
      {selectedItem && (
        <div style={{ marginTop: "60px" }}>


          <DynamicForm
            schema={schema}
            data={selectedItem}
            action={action}
            onDataFromGrandchild={onDataFromGrandchild}
            title={`${action} ${entity}`}
            rdata={rdata}
          />

        </div>
      )}
    </Modal>
  );
};

export default AddModal;
