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
          <p className="sidebar__username">{username}</p>
        </div>
        <button
          className="sidebar__edit-btn"
          type="button"
          onClick={onEditProfile}
        >
          Edit Profile
        </button>
      </div>
      <button className="sidebar__logout-btn" type="button" onClick={onLogOut}>
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
