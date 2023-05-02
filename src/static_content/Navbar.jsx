import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import logo from "./nav_logo/sas_only_logo.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

    const handleClick = (e) => {
    if (!e.target.classList.contains("nav__link") && !e.target.classList.contains("nav__toggler")) {
      setActive("nav__menu");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  
  return (
    <nav className="nav" onScroll={navToggle}>
      <Link to="/" className="nav__brand">
        <div className="nav__logo-group">
          <img src={logo} alt="SAS Logo" />
        </div>
      </Link>
      <ul className={`${active} nav__links-left`}>
        <li className="nav__item">
          <Link to="/" className={`nav__link${pathname === '/' ? ' active' : ''}`} onClick={() => setActive("nav__menu")}>
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/game" className={`nav__link${pathname === '/game' ? ' active' : ''}`}  onClick={() => setActive("nav__menu")}>
            Play
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/rules" className={`nav__link${pathname === '/rules' ? ' active' : ''}`} onClick={() => setActive("nav__menu")}>
            Rules
          </Link>
        </li>
      </ul>
      {/*
      <ul className={`${active} nav__links-right`}>
        <li className="nav__item">
          <Link to="/login" className={`nav__link nav__link-login${pathname === '/login'?'active' : ''}`} onClick={() => setActive("nav__menu")}>
            Login
          </Link>
        </li>
      </ul>
      */}
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
