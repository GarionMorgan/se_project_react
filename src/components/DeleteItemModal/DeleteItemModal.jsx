import "./DeleteItemModal.css";
import CloseBtn from "../../assets/X_close.svg";
import { useEffect, useRef } from "react";

const DeleteItemModal = ({ onClose, onDeleteItem, itemId, buttonText }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleConfirmDelete = () => {
    onDeleteItem({ _id: itemId }); // Call the onDeleteItem prop with the item ID
    onClose(); // Close the modal after deletion
  };

  return (
    <div className="deleteItemModal">
      <div className="deleteItemModal__content" ref={modalRef}>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={CloseBtn}
            alt="X close button"
            className="modal__close-btn"
          />
        </button>
        <h2 className="deleteItemModal__title">
          <p className="deleteItemModal__text">
            Are you sure you want to delete this item?
          </p>
          <p className="deleteItemModal__text">This action is irreversible.</p>
        </h2>
        <div className="deleteItemModal__delete-btn ">
          <button
            className="deleteItemModal__button deleteItemModal__button_type_confirm"
            onClick={handleConfirmDelete}
          >
            {buttonText}
          </button>
        </div>
        <div className="deleteItemModal__cancel-btn">
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
