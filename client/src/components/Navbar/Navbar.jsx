import React from "react";
import "./Navbar.css";
import "../../App.css";

const Navbar = () => {
  return (
    <header>
      <nav id="navbar" className="hidden lg:block">
        <ul className="flex justify-between mx-20 mt-20 list-none p-0">
          <li className="navbar-item">
            <a href="#hero" className="text-white no-underline text-base">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="#about" className="text-white no-underline text-base">
              About Me
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#technologies"
              className="text-white no-underline text-base"
            >
              What I Work With
            </a>
          </li>
          <li className="navbar-item">
            <a href="#projects" className="text-white no-underline text-base">
              What I'm Working On
            </a>
          </li>
          <li className="navbar-item">
            <a href="#contact" className="text-white no-underline text-base">
              Reach Out To Me
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
