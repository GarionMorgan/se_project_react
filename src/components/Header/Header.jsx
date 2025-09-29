import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import default_avatar from "../../assets/default_avatar.svg";
import burgerMenu from "../../assets/hamburger_btn.svg";
import MenuModal from "../MenuModal/MenuModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  handleMenuClick,
  activeModal,
  onClose,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Tegegne";

  return (
    <header className="header">
      <div className="header__main">
        <Link to="/se_project_react">
          <img className="header__logo" src={logo} alt="What To Wear Logo" />
        </Link>

        <button className="header__hamburger-btn" onClick={handleMenuClick}>
          <img
            src={burgerMenu}
            alt="Hamburger Menu Icon"
            type="button"
            className="header__hamburger_image"
          />
        </button>
      </div>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__right-container">
        <ToggleSwitch className="header__toggle-switch" />
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <Link to="/se_project_react/profile" className="header__profile-link">
          <div className="header__user-container">
            <p className="header__username">{username}</p>
            {avatar ? (
              <img
                className="header__profile"
                src={avatar || default_avatar}
                alt="User Avatar"
              />
            ) : (
              <span.header__avatar.header__avatar_none>
                {username.charAt(0).toUpperCase() || ""}
              </span.header__avatar.header__avatar_none>
            )}{" "}
          </div>
        </Link>
      </div>

      {activeModal ? (
        <MenuModal isOpen={activeModal} onClose={onClose} />
      ) : null}
    </header>
  );
}

export default Header;
