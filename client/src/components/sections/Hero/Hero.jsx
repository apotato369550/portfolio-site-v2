import React from 'react';
import './Hero.css';
import NavBar from '../../Navbar/Navbar';

const Hero = () => {
  return (
    <div id="hero">
      <div className='hero-image-container'>
        <div className="hero-container">
          <NavBar />
          <div className="name-and-titles-container">
            <div className="name-and-titles">
              <p className="greeting">Hi! I'm</p>
              <h1 className="jay">JAY.</h1>
              <span className="name"><strong>J</strong>ohn <strong>A</strong>ndre <strong>Y</strong>ap</span>
              <p className='roles'>Fullstack Developer - Data Scientist</p>
              <p className='roles'>Student - Scholar - Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;