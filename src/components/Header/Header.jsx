import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import burgerMenu from "../../assets/hamburger_btn.svg";
import MenuModal from "../MenuModal/MenuModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  handleSignUpClick,
  handleSignInClick,
  currentUser,
}) {
  const [isBurgerMenuOpened, setBurgerMenuOpened] = useState(false);

  const handleBurgerMenuClick = () => {
    setBurgerMenuOpened((value) => !value);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = currentUser?.name || "";

  return (
    <header className="header">
      <div className="header__main">
        <Link to="/">
          <img className="header__logo" src={logo} alt="What To Wear Logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city || "your location"}
        </p>

        <button
          className="header__hamburger-btn"
          onClick={handleBurgerMenuClick}
        >
          <img
            src={burgerMenu}
            alt="Hamburger Menu Icon"
            type="button"
            className="header__hamburger_image"
          />
        </button>
      </div>

      <div className="header__right-container">
        <ToggleSwitch className="header__toggle-switch" />
        {currentUser && (
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
        )}
        {currentUser ? (
          <Link to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username">{username}</p>
              {currentUser?.avatar ? (
                <img
                  className="header__profile"
                  src={currentUser.avatar}
                  alt="User Avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {username.charAt(0).toUpperCase() || "?"}
                </div>
              )}{" "}
            </div>
          </Link>
        ) : (
          <>
            <button
              className="header__sign-up"
              type="button"
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
            <button
              className="header__sign-in"
              type="button"
              onClick={handleSignInClick}
            >
              Sign in
            </button>
          </>
        )}
      </div>

      {isBurgerMenuOpened && (
        <MenuModal
          onClose={handleBurgerMenuClick}
          username={username}
          handleAddClick={handleAddClick}
          avatar={currentUser?.avatar}
          defaultAvatar={defaultAvatar}
          currentUser={currentUser}
          handleSignUpClick={handleSignUpClick}
          handleSignInClick={handleSignInClick}
        />
      )}
    </header>
  );
}

export default Header;
