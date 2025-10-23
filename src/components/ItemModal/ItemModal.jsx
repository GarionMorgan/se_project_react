import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import CloseBtn from "../../assets/X_close_white.svg";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import { useModalClose } from "../../hooks/useModalClose";

function ItemModal({ activeModal, onClose, card, onDeleteItem, isLoading }) {
  const [deleteCardId, setDeleteCardId] = useState(null);

  const handleDeleteConfirmationClose = () => {
    setDeleteCardId(null);
    setDeleteModalOpened(false);
    setIsPreviewOpened(false);
    onClose();
  };

  const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);
  const [isPreviewOpened, setIsPreviewOpened] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const isOwner = card && currentUser && card.owner === currentUser._id;

  const handleDeleteMenuClick = () => {
    setDeleteCardId(card._id);
    setDeleteModalOpened(true);
    setIsPreviewOpened(false);
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

  useModalClose(isPreviewOpened, handleCloseAllModals);

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

            {isOwner && (
              <div className="modal__delete-btn">
                <button
                  className="modal__delete-btn"
                  onClick={handleDeleteMenuClick}
                >
                  Delete item
                </button>
              </div>
            )}
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
          buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
        />
      )}
    </div>
  );
}

export default ItemModal;
