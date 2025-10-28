import "./MenuModal.css";
import CloseBtn from "../../assets/X_close.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useEffect, useRef } from "react";

const MenuModal = ({
  onClose,
  username,
  handleAddClick,
  avatar,
  defaultAvatar,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 675) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [onClose]);

  return (
    <div className="menuModal modal_opened">
      <div className="menuModal__content" ref={modalRef}>
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
        <div className="menuModal__elements">
          <div className="menuModal__user-data">
            <p>{username}</p>
            {avatar ? (
              <img
                className="header__profile"
                src={avatar || defaultAvatar}
                alt="User Avatar"
              />
            ) : (
              <span className="header__avatar header__avatar_none">
                {username.charAt(0).toUpperCase() || ""}
              </span>
            )}{" "}
          </div>
          <button
            type="button"
            className="menuModal__add-clothes"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
          <ToggleSwitch />
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
