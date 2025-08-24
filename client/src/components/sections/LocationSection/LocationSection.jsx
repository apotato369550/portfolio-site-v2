import React from "react";
import "./LocationSection.css";
import treeImage from "../../../assets/vaporwave trees.png";
import flagImage from "../../../assets/grunge_pinoy_flag.png";
import cebuImage from "../../../assets/cebu_cropped_nobg.png";

const LocationSection = () => {
  return (
    <div
      id="location-section"
      className="m-0 p-0 w-full relative overflow-hidden"
    >
      <div className="location-gradient-container h-full w-full m-0 p-0">
        {/* Floating Crystal Elements */}
        <div className="floating-crystals absolute inset-0 z-1">
          <div className="crystal crystal-1 absolute w-16 h-16 bg-gradient-to-br from-cyan-400/25 to-transparent rounded-lg transform rotate-45 blur-sm"></div>
          <div className="crystal crystal-2 absolute w-12 h-12 bg-gradient-to-br from-purple-400/25 to-transparent rounded-lg transform rotate-12 blur-sm"></div>
          <div className="crystal crystal-3 absolute w-20 h-8 bg-gradient-to-br from-pink-400/25 to-transparent rounded-lg transform -rotate-30 blur-sm"></div>
          <div className="crystal crystal-4 absolute w-14 h-14 bg-gradient-to-br from-blue-400/25 to-transparent rounded-lg transform rotate-60 blur-sm"></div>
        </div>

        {/* Wireframe Geometric Elements */}
        <div className="wireframe-elements absolute inset-0 z-2 pointer-events-none">
          <svg className="wireframe wireframe-1 absolute w-24 h-24" viewBox="0 0 100 100">
            <polygon points="50,15 90,85 10,85" className="wireframe" />
          </svg>
          <svg className="wireframe wireframe-2 absolute w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" className="wireframe" />
          </svg>
          <svg className="wireframe wireframe-3 absolute w-16 h-16" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" className="wireframe" />
          </svg>
        </div>

        {/* Glowing Orbs */}
        <div className="location-orb location-orb-1 w-4 h-4 bg-cyan-400 rounded-full blur-sm"></div>
        <div className="location-orb location-orb-2 w-3 h-3 bg-purple-400 rounded-full blur-sm"></div>
        <div className="location-orb location-orb-3 w-5 h-5 bg-pink-400 rounded-full blur-sm"></div>

        <div className="location-container relative z-10">
          {/* Tree Background */}
          <div className="tree-background">
            <img
              className="tree"
              src={treeImage}
              alt="Vaporwave palm trees"
            />
          </div>

          {/* Left Side - Images with Enhanced Effects */}
          <div className="images-section relative">
            {/* Enhanced Ellipse Effects */}
            <div className="location-ellipse location-ellipse-1 absolute rounded-full transform rotate-30"></div>
            <div className="location-ellipse location-ellipse-2 absolute rounded-full transform -rotate-15"></div>
            <div className="location-ellipse location-ellipse-3 absolute rounded-full transform rotate-45"></div>

            <div className="cebu-container">
              <div className="cebu-and-flag flex flex-col items-center space-y-6 lg:space-y-8">
                <div className="relative">
                  <img
                    className="cebu w-80 sm:w-96 lg:w-[28rem] xl:w-[32rem] h-auto relative z-20"
                    src={cebuImage}
                    alt="Cebu cityscape"
                  />
                </div>
                <div className="relative">
                  <img
                    className="flag w-64 sm:w-80 lg:w-[24rem] xl:w-[28rem] h-auto relative z-20"
                    src={flagImage}
                    alt="Philippine flag"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content Cards */}
          <div className="content-section space-y-8 lg:space-y-12">
            {/* Location Question and Answer */}
            <div className="location-block space-y-6">
              <div className="location-title px-10 py-8 lg:px-14 lg:py-12 rounded-3xl">
                <h1 className="font-light text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
                  <span className="question-emphasis font-extralight italic">Where</span> am I located?
                </h1>
              </div>
              <div className="location-information px-10 py-8 lg:px-14 lg:py-12 rounded-3xl">
                <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed">
                  Currently coding life away in sunny <em className="text-cyan-200 font-medium">Cebu</em>, 
                  at the center of <em className="text-cyan-200 font-medium">Visayas, Philippines</em>
                </p>
              </div>
            </div>

            {/* Education Question and Answer */}
            <div className="education-block space-y-6">
              <div className="location-title px-10 py-8 lg:px-14 lg:py-12 rounded-3xl">
                <h1 className="font-light text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
                  <span className="question-emphasis font-extralight italic">Where</span> am I studying?
                </h1>
              </div>
              <div className="location-information px-10 py-8 lg:px-14 lg:py-12 rounded-3xl">
                <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed">
                  Currently studying Computer Science at{" "}
                  <em className="text-purple-200 font-medium">The University of San Carlos</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;