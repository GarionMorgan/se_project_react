import "./MenuModal.css";
import CloseBtn from "../../assets/X_close.svg";

function MenuModal({ isOpen, onClose }) {
  return (
    <div className={`menuModal ${isOpen && "modal_opened"}`}>
      <div className="menuModal__content">
        <button
          className="menuModal__close-btn"
          type="button"
          onClick={onClose}
        >
          <img
            src={CloseBtn}
            alt="X close button"
            className="menuModal__close-btn"
          />
        </button>
      </div>
      MenuModal!!
    </div>
  );
}

export default MenuModal;
