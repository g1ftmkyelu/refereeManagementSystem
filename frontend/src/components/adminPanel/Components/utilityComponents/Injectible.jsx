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
  const [modalOpen, setModalOpen] = useState(false);

  const openMyModal = () => {
    setModalOpen(true);
  };

  const closeMyModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-green-600 text-white flex items-center justify-center rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        onClick={openMyModal}
      >
        <ButtonIcon className="w-5 h-5 mr-2" /> {/* Assuming ButtonIcon is an SVG icon */}
        {buttonCaption}
      </button>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeMyModal}
        style={modalStyle}
        contentLabel="Injected Modal"
        shouldCloseOnOverlayClick={true}
        className='flex justify-center content-center items-center'
      >
        <button onClick={closeMyModal} style={modalStyle.closeButton}>
          {isFullScreen ? 'Back' : 'Close'}
        </button>
        <div className="mt-28"></div>
        {component}
      </Modal>
    </div>
  );
};

export default Injectible;
