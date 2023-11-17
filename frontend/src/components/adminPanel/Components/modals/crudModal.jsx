import React, { useState } from 'react';
import Modal from 'react-modal';
import DynamicForm from '../specialRenderComponents/dynamicForm';
import { FaTimes } from 'react-icons/fa';

const AddModal = ({ isOpen, onRequestClose, selectedItem, action, entity, schema, onDataFromGrandchild}) => {

  const customStyles = {
    content: {
      maxWidth: '900px',
      maxHeight: '900px',
      margin: 'auto',
    },
 overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      width:'100vw',
      height:'100vh'
      
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
        <FaTimes style={{ float: 'right' }}  size={30} />
      </div>
      {selectedItem && (
        <div style={{ marginTop: "60px" }}>
   

            <DynamicForm
              schema={schema}
              data={selectedItem}
              action={action}
              onDataFromGrandchild={onDataFromGrandchild}
              title={`${action} ${entity}`}
            />

        </div>
      )}
    </Modal>
  );
};

export default AddModal;
