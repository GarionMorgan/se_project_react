import "./ModalWithForm.css";
import CloseBtn from "../../assets/X_close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={CloseBtn}
            alt="X close button"
            className="modal__close-btn"
          />
        </button>
        <form action="" onSubmit={onSubmit} className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
