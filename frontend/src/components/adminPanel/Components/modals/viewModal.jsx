import React, { useState } from 'react';
import Modal from 'react-modal';
import ViewData from '../specialRenderComponents/viewData';
import { FaTimes } from 'react-icons/fa';

const viewModal = ({ isOpen, onRequestClose, selectedItem, schema }) => {

    const customStyles = {
        content: {
            maxWidth: '500px',
            maxHeight: '700px',
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
                <FaTimes style={{ float: 'right' }}  size={30} />
            </div>
            {selectedItem && (
                <div style={{ marginTop: "60px" }}>


                    <ViewData
                        schema={schema}
                        data={selectedItem}
                    />

                </div>
            )}
        </Modal>
    );
};

export default viewModal;
