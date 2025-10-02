import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar({ username }) {
  return (
    <div className="SideBar">
      <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
      <p className="sidebar__username">{username}</p>
    </div>
  );
}

export default SideBar;
