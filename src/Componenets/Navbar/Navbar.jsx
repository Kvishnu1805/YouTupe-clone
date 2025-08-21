import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import menu_icon from "../../assets/menu.png";
import logo_icon from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_iconn from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";

const Navbar = ( {setSidebar}) => {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" src={menu_icon} onClick={ ()=> setSidebar( prev => prev === false ? true : false)} alt="" />
        <Link to={"/"}><img className="logo-icon" src={logo_icon} alt="" /></Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img src={search_icon} alt="" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_iconn} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} alt="" className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
