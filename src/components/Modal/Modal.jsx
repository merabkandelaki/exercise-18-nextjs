import React from 'react';
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal">
      {children}
      <button className="modal-close" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Modal;
