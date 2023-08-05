import React, { useEffect, useState, useRef } from "react";
import "./navbar.css";

import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import ThemeToggleMain from "./ThemeToggleMain";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/userAction";

const Navbar = () => {
   const { user,isAuthenticated } = useSelector((s) => s.user);
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const ref = useRef(null)
  useEffect(() => {
    let handler = (e) => {
      if (!ref.current.contains(e.target)) {
        setShowMediaIcons(false);
      }
    };
    document.addEventListener("mousedown", handler);
   
  }, [])
   const navigate = useNavigate();
   const dispatch = useDispatch();
 
   const logout = () => {
     dispatch(logoutAction());
     navigate("/login");
   };
  return (
    <>
      <nav className="main-nav" ref={ref}>
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <NavLink to="/">
              {" "}
              <span>Asikur</span>
            </NavLink>
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
          <ul>
            <li>
              <NavLink to="/portfolio/home">Home</NavLink>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>

            <li>
              <a href="#contact">Contact</a>
            </li>
            {isAuthenticated === false ? (
              <li>
                <a href="/login">login</a>
              </li>
            ) : (
              ""
            )}
            <li>
              <a href="/blog/home">Blogs</a>
            </li>
            {user && (
              <li>
                <NavLink to="/account">Account</NavLink>
              </li>
            )}
            <li>
              <ThemeToggleMain />
            </li>
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons ? (
                <CloseIcon className="mobile-btn" />
              ) : (
                <MenuIcon className="mobile-btn" />
              )}
            </a>
            <span>
             
              <ThemeToggleMain className="mobile-btn" />
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
