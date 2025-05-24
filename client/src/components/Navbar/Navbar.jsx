import React from 'react'
import './Navbar.css';
import hamburger from "../../assets/hamburger.png";
import close from "../../assets/close.png";

const Navbar = () => {
  return (
    <header>
      <nav id="navbar">
        <input
          type="checkbox"
          id="nav-checkbox"
          className="nav-checkbox"
          style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
        />
        <label htmlFor="nav-checkbox" className="nav-toggle">
          <img
            src={hamburger}
            width="100"
            height="100"
            className="hamburger"
            title="hamburger"
          />
          <img
            src={close}
            width="100"
            height="100"
            className="close"
            title="close"
          />
        </label>
        <ul className="navbar-items">
          <li class="navbar-item">
            <a href="#hero">Home</a>
          </li>
          <li class="navbar-item">
            <a href="#about">About Me</a>
          </li>
          <li class="navbar-item">
            <a href="#technologies">What I Work With</a>
          </li>
          <li class="navbar-item">
            <a href="#projects">What I'm Working On</a>
          </li>
          <li class="navbar-item">
            <a href="#contact">Reach Out To Me</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar