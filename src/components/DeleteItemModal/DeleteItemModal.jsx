import { useState } from "react";
import "./DeleteItemModal.css";

const DeleteItemModal = ({ onClose }) => {
  const handleDeleteCancelBtn = () => {
    onClose(); // This tells the parent to close the modal
  };

  return (
    <div className="deleteItemModal">
      <div className="deleteItemModal__content">
        <h2 className="deleteItemModal__title">
          <p>Are you sure you want to delete this item?</p>
          <p>This action is irreversible.</p>
        </h2>
        <div className="deleteItemModal__delete-btn ">
          <button
            className="deleteItemModal__button deleteItemModal__button_type_confirm"
            // onClick={onDeleteConfirm}
          >
            Yes, delete item
          </button>
        </div>
        <div className="deleteItemModal__cancel-btn deleteItemModal__buttons">
          <button
            className="deleteItemModal__button deleteItemModal__button_type_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteItemModal;
