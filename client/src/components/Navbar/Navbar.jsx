import React from 'react'
import './Navbar.css';
import hamburger from "../../assets/hamburger.png";
import close from "../../assets/close.png";

const Navbar = () => {
  return (
    <header>
      <nav id="navbar">
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