import React from "react";
import "./Navbar.css";
import "../../App.css";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav id="navbar" className="hidden lg:block w-full">
        <ul className="flex justify-between items-center mx-16 lg:mx-20 xl:mx-24 2xl:mx-32 mt-8 lg:mt-12 xl:mt-16 2xl:mt-20 list-none p-0">
          <li className="navbar-item">
            <a
              href="#hero"
              className="text-white no-underline text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#about"
              className="text-white no-underline text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              About Me
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#technologies"
              className="text-white no-underline text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              What I Work With
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#projects"
              className="text-white no-underline text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              What I'm Working On
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#contact"
              className="text-white no-underline text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              Reach Out To Me
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
