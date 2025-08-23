import React from "react";
import "./Hero.css";
import NavBar from "../../Navbar/Navbar";

const Hero = () => {
  return (
    <div
      id="hero"
      className="h-screen w-screen m-0 p-0 relative overflow-hidden"
    >
      <div className="hero-image-container h-full w-full m-0 p-0">
        <div className="hero-container h-full w-full m-0 p-0 flex flex-col">
          <NavBar />
          <div className="name-and-titles-container w-full flex-1 flex items-center justify-center">
            <div className="name-and-titles text-center max-w-7xl mx-auto px-4">
              <p className="greeting text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl m-0 mb-6 text-white font-light">
                Hi! I'm
              </p>
              <div className="jay-container relative inline-block mb-12">
                <div className="jay-glow absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 opacity-80 blur-xl transform scale-110"></div>
                <h1 className="jay text-9xl sm:text-10xl md:text-11xl lg:text-12xl xl:text-13xl 2xl:text-14xl m-0 p-0 leading-none relative z-10 text-white font-bold">
                  JAY.
                </h1>
              </div>
              <div className="name-and-roles space-y-4">
                <span className="name text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl m-0 text-white font-medium block">
                  <strong className="text-pink-400">J</strong>ohn{" "}
                  <strong className="text-purple-400">A</strong>ndre{" "}
                  <strong className="text-blue-400">Y</strong>ap
                </span>
                <p className="roles text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl m-0 text-white font-light">
                  Fullstack Developer - Data Scientist
                </p>
                <p className="roles text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl m-0 text-white font-light">
                  Student - Scholar - Developer
                </p>
              </div>
            </div>
          </div>
          <div className="scroll-instruction absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light">
              Scroll or Click The Navbar to Get Started!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
