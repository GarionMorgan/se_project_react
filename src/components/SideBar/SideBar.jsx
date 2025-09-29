import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="SideBar">
      <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default SideBar;
