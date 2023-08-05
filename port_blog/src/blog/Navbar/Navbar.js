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
              <NavLink to="/blog/home">Home</NavLink>
            </li>

            <li>
              <NavLink to="/blogs" hrefLang="#blogs">
                Blogs
              </NavLink>
            </li>

            <li>
              <NavLink to="/post/blog">Post a Blog</NavLink>
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
