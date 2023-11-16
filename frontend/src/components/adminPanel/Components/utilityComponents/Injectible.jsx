import React, { useState } from 'react';
import Modal from 'react-modal';

// Styling for the modal (you can customize it further)
const modalStyle = {
  content: {
    width: '100vw',
    height: '100vh',
    top: 0, // Remove any top spacing
    left: 0, // Remove any left spacing
    right: 0, // Remove any right spacing
    bottom: 0, // Remove any bottom spacing
    margin: 0, // Remove margin
    padding: 0, // Remove padding
    border: 'none',
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
      <button onClick={openModal}>
        <ButtonIcon /> {buttonCaption}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Injected Modal"
        shouldCloseOnOverlayClick={true} // Close modal when clicking outside of it
      >
        <button onClick={closeModal} style={{ float: 'left' }}>
          {isFullScreen ? 'Back' : 'Close'} {/* Change label based on isFullScreen */}
        </button>
        {component}
      </Modal>
    </div>
  );
};

export default Injectible;
