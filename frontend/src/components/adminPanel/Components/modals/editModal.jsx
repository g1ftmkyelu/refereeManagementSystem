import React from 'react';
import Modal from 'react-modal';
import DynamicForm from '../specialRenderComponents/dynamicForm';
import { FaTimes } from 'react-icons/fa';

const EditModal = ({ isOpen, onRequestClose, selectedItem, schema, onDataFromGrandchild }) => {
    const customStyles = {
        content: {
            maxWidth: '700px',
            maxHeight: '700px',
            margin: 'auto',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: -20,
            zIndex: 9999, // Set a high z-index value to ensure the overlay is on top
        },
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
                <div>
                    {/* Add your modal content here */}
                    <DynamicForm schema={schema} data={selectedItem} onDataFromGrandchild={onDataFromGrandchild} title={`Edit Item`} />
                </div>
            )}
        </Modal>
    );
};

export default EditModal;
