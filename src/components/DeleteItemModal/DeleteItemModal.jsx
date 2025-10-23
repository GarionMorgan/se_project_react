import "./DeleteItemModal.css";

const DeleteItemModal = ({ onClose, onDeleteItem, itemId, buttonText }) => {
  const handleConfirmDelete = () => {
    onDeleteItem({ _id: itemId }); // Call the onDeleteItem prop with the item ID
    onClose(); // Close the modal after deletion
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
            onClick={handleConfirmDelete}
          >
            {buttonText}
          </button>
        </div>
        <div className="deleteItemModal__cancel-btn">
          <button className="deleteItemModal__button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteItemModal;
