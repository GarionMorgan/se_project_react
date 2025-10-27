import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser?.name || "User";
  const avatarUrl = currentUser?.avatar;

  return (
    <div className="SideBar">
      <div className="sidebar__header">
        <div className="sidebar__user-info">
          {avatarUrl ? (
            <img className="sidebar__avatar" src={avatarUrl} alt={username} />
          ) : (
            <div className="sidebar__avatar-placeholder">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="sidebar__name">{username}</h2>
        </div>
        <div className="sidebar__actions">
          <button
            className="sidebar__edit-btn"
            type="button"
            onClick={onEditProfile}
          >
            Change Profile data
          </button>
        </div>
        <button
          className="sidebar__logout-btn"
          type="button"
          onClick={onLogOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
