import React, { useState } from 'react';
import Modal from 'react-modal';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },

  
  content: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'auto',
    outline: 'none',
    backgroundColor: 'white',
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },


  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ccc',
    cursor: 'pointer',
  },
};

const Injectible = ({ component, buttonCaption, ButtonIcon, isFullScreen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className='p-2 bg-lime-700 flex items-center m-2 rounded-sm' onClick={openModal}>
        <ButtonIcon /> {buttonCaption}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Injected Modal"
        shouldCloseOnOverlayClick={true}
        className='flex justify-center content-center items-center'
      >
        <button onClick={closeModal} style={modalStyle.closeButton}>
          {isFullScreen ? 'Back' : 'Close'}
        </button>
        {component}
      </Modal>
    </div>
  );
};

export default Injectible;
