import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
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

  return (
    <header className="header">
      <div className="header__main">
        <img className="header__logo" src={logo} alt="What To Wear Logo" />
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
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </div>

      {activeModal ? (
        <MenuModal isOpen={activeModal} onClose={onClose} />
      ) : null}
    </header>
  );
}

export default Header;
