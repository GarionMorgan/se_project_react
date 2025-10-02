import "./MenuModal.css";
import CloseBtn from "../../assets/X_close.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const MenuModal = ({
  onClose,
  username,
  handleAddClick,
  avatar,
  defaultAvatar,
}) => (
  <div className="menuModal modal_opened">
    <div className="menuModal__content">
      <button className="menuModal__close-btn" type="button" onClick={onClose}>
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
            <span.header__avatar.header__avatar_none>
              {username.charAt(0).toUpperCase() || ""}
            </span.header__avatar.header__avatar_none>
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

export default MenuModal;
