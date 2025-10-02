import { useState, useEffect } from "react";
import "./ItemModal.css";
import CloseBtn from "../../assets/X_close_white.svg";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const [deleteCardId, setDeleteCardId] = useState(null);

  const handleDeleteConfirmationClose = () => {
    setDeleteCardId(null);
    setDeleteModalOpened(false);
    setIsPreviewOpened(false);
    onClose();
  };

  const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);
  const [isPreviewOpened, setIsPreviewOpened] = useState(false);

  const handleDeleteMenuClick = () => {
    console.log(card);
    setDeleteCardId(card._id);
    setDeleteModalOpened(true);
    setIsPreviewOpened(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpened(false);
    setIsPreviewOpened(true);
  };

  const handleCloseAllModals = () => {
    setIsPreviewOpened(false);
    setDeleteModalOpened(false); // Close delete modal if open
    onClose();
  };

  useEffect(() => {
    if (activeModal === "preview") {
      setIsPreviewOpened(true);
      setDeleteModalOpened(false);
    }
  }, [activeModal]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsPreviewOpened(false);
        setDeleteModalOpened(false);
        onClose(); // Notify parent to reset activeModal if needed
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div
      className={`modal ${
        isPreviewOpened || isDeleteModalOpened ? "modal_opened" : ""
      }`}
    >
      {isPreviewOpened && (
        <div className="modal__content modal__content_type_image">
          <button
            className="modal__close"
            type="button"
            onClick={handleCloseAllModals}
          >
            <img
              src={CloseBtn}
              alt="X close button white"
              className="modal__close-btn"
            />
          </button>
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
          <div className="modal__footer">
            <div className="modal__footer_info">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>

            <div className="modal__delete-btn">
              <button
                className="modal__delete-btn"
                onClick={handleDeleteMenuClick}
              >
                Delete item
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteCardId && (
        <DeleteItemModal
          onClose={handleDeleteConfirmationClose}
          onDeleteItem={(id) => {
            onDeleteItem(id);
            handleCloseAllModals();
          }}
          itemId={deleteCardId}
        />
      )}
    </div>
  );
}

export default ItemModal;
