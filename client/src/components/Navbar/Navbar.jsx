import React from 'react'
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <ul className="navbar-items">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About Me</a></li>
        <li><a href="#technologies">What I Work With</a></li>
        <li><a href="#projects">What I'm Working On</a></li>
        <li><a href="#contact">Reach Out To Me</a></li>
      </ul>
    </div>
  )
}

export default Navbar