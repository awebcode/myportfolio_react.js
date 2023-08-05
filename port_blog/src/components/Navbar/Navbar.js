import React, { useEffect, useState, useRef } from "react";
import "./navbar.css";

import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import ThemeToggleMain from "./ThemeToggleMain";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector((s) => s.user);
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
  
  return (
    <>
      <nav className="main-nav" ref={ref}>
        {/* 1st logo part  */}
        {/* <div className="logo">
          <h2>
            <span>Asikur</span>
          </h2>
        </div> */}

        {/* 2nd menu part  */}
        <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/portfolio/home">Portfolio</NavLink>
            </li>
            <li>
              <NavLink to="/blog/home">Blogs</NavLink>
            </li>

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
