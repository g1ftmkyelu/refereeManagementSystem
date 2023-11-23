import React, { useState } from 'react';
import Modal from 'react-modal';


// Styling for the modal (customized for improved appearance)
const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80%',
    minHeight: '80%',
    padding: '20px',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'auto',
    outline: 'none',
    backgroundColor: 'white',
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
