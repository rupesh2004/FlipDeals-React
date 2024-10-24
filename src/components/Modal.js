// Modal.js
import React from 'react';
import './Modal.css'; // Import CSS for the modal styling

const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times; {/* Close button */}
        </span>
        <img src={imageUrl} alt="Product" className="modal-image" />
      </div>
    </div>
  );
};

export default Modal;
