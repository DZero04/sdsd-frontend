import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import logo_dark from "../../assets/images/logo_dark.png";
import logo_white from "../../assets/images/logo_white.png";
import {
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineInsights ,
} from "react-icons/md";
import { GiTongue } from "react-icons/gi";
import { IoPersonCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
          <img src={theme === LIGHT_THEME ? logo_white : logo_white} alt="" className="sidebar-logo"/>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            {/* <li className="menu-item">
              <NavLink to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineInsights size={22} />
                </span>
                <span className="menu-link-text">Overview</span>
              </NavLink>
            </li> */}
            <li className="menu-item">
              <NavLink to="/tongue-screening" className="menu-link">
                <span className="menu-link-icon">
                  <GiTongue size={22} />
                </span>
                <span className="menu-link-text">Tongue Screening</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/screening-results" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={22} />
                </span>
                <span className="menu-link-text">Screening Results</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/about" className="menu-link">
                <span className="menu-link-icon">
                  <IoPersonCircle size={22} />
                </span>
                <span className="menu-link-text">About</span>
              </NavLink>
            </li>
            
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Sidebar;
