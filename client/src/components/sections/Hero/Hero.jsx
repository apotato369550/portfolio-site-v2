import React from "react";
import "./Hero.css";
import NavBar from "../../Navbar/Navbar";

const Hero = () => {
  return (
    <div id="hero" className="h-screen w-screen m-0 p-0">
      <div className="hero-image-container h-full w-full m-0 p-0">
        <div className="hero-container h-full w-full m-0 p-0 pt-16 lg:pt-0">
          <NavBar />
          <div className="name-and-titles-container w-full mt-0 text-center lg:mt-24">
            <div className="name-and-titles mx-auto w-4/5 lg:w-2/3">
              <p className="greeting text-3xl lg:text-5xl m-0 mx-10 lg:mx-0 lg:ml-10 p-0 text-left">
                Hi! I'm
              </p>
              <div className="jay-container relative inline-block">
                <div className="jay-glow absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-80 blur-lg transform scale-110"></div>
                <h1 className="jay text-36 lg:text-64 xl:text-72 m-0 p-0 leading-none relative z-10">
                  JAY.
                </h1>
              </div>
              <div className="name-and-roles mt-5">
                <span className="name text-xl lg:text-3xl m-0 my-2.5">
                  <strong>J</strong>ohn <strong>A</strong>ndre{" "}
                  <strong>Y</strong>ap
                </span>
                <p className="roles text-xl lg:text-3xl m-0 my-2.5">
                  Fullstack Developer - Data Scientist
                </p>
                <p className="roles text-xl lg:text-3xl m-0 my-2.5">
                  Student - Scholar - Developer
                </p>
              </div>
            </div>
          </div>
          <div className="scroll-instruction absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm lg:text-base">
            Scroll or Click The Navbar to Get Started!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
