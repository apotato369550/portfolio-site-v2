import React from "react";
import "./IdentitySection.css";
import statueImage from "../../../assets/vaporwave statue.png";
import pillarImage from "../../../assets/vaporwave pillar.png";

const IdentitySection = () => {
  return (
    <div
      id="identity-section"
      className="m-0 p-0 h-screen w-full relative overflow-hidden"
    >
      <div className="identity-gradient-container h-full w-full m-0 p-0">
        <div className="identity-container h-full w-full m-0 p-0 flex flex-col lg:flex-row items-center justify-center px-4 lg:px-8">
          {/* Left Side - Statue with Subtle Ellipses */}
          <div className="statue-container w-full lg:w-1/2 flex justify-center items-center relative z-10">
            <div className="statue-wrapper relative w-3/4 lg:w-2/3 max-w-lg">
              {/* Subtle Ellipse Effects - Much Smaller */}
              <div className="statue-ellipse statue-ellipse-1 absolute rounded-full z-10 transform rotate-30"></div>
              <div className="statue-ellipse statue-ellipse-2 absolute rounded-full z-10 transform rotate-160"></div>

              {/* Subtle Glowing Orbs */}
              <div className="glow-orb orb-1 absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm"></div>
              <div className="glow-orb orb-2 absolute w-1.5 h-1.5 bg-purple-400 rounded-full blur-sm"></div>

              <img
                className="statue w-full mx-auto relative z-20 drop-shadow-xl filter brightness-105"
                src={statueImage}
                alt="vaporwave statue image"
              />
            </div>
          </div>

          {/* Right Side - Creative Pillar Layout */}
          <div className="pillars-container w-full lg:w-1/2 flex flex-col space-y-6 lg:space-y-8 px-4 lg:px-6 relative z-10">
            {/* Main Title with Pillar Integration */}
            <div className="title-section flex items-center justify-center lg:justify-start space-x-4 mb-6">
              <div className="identity-title px-6 py-4 rounded-2xl text-center lg:text-left">
                <h1 className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  <span className="question-emphasis font-extralight italic">
                    Who
                  </span>{" "}
                  am I, really?
                </h1>
              </div>
              <img
                src={pillarImage}
                alt="pillar image"
                className="pillar-accent w-16 h-16 lg:w-20 lg:h-20 transform rotate-12 opacity-80"
              />
            </div>

            {/* Content Cards with Pillar Accents */}
            <div className="content-grid grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* First Content Card */}
              <div className="content-card identity-information-1 px-5 py-4 rounded-2xl text-center transform hover:scale-102 transition-transform duration-300">
                <div className="card-header flex items-center justify-center space-x-3 mb-3">
                  <img
                    src={pillarImage}
                    alt="pillar accent"
                    className="pillar-mini w-8 h-8 opacity-70"
                  />
                  <h3 className="text-cyan-300 font-medium text-sm lg:text-base">
                    Innovation
                  </h3>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                  A developer who bridges classical elegance with modern
                  innovation, creating digital experiences that are both
                  beautiful and functional.
                </p>
              </div>

              {/* Second Content Card */}
              <div className="content-card identity-information-2 px-5 py-4 rounded-2xl text-center transform hover:scale-102 transition-transform duration-300">
                <div className="card-header flex items-center justify-center space-x-3 mb-3">
                  <img
                    src={pillarImage}
                    alt="pillar accent"
                    className="pillar-mini w-8 h-8 opacity-70"
                  />
                  <h3 className="text-purple-300 font-medium text-sm lg:text-base">
                    Passion
                  </h3>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                  Driven by curiosity and a love for learning, exploring the
                  intersection of art and science to create meaningful digital
                  solutions.
                </p>
              </div>
            </div>

            {/* Bottom Pillar Row - Creative Layout */}
            <div className="bottom-pillars flex justify-center lg:justify-end space-x-4 mt-4">
              <img
                src={pillarImage}
                alt="pillar image"
                className="pillar-bottom w-12 h-12 lg:w-16 lg:h-16 transform -rotate-12 opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
              <img
                src={pillarImage}
                alt="pillar image"
                className="pillar-bottom w-12 h-12 lg:w-16 lg:h-16 transform rotate-12 opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
              <img
                src={pillarImage}
                alt="pillar image"
                className="pillar-bottom w-12 h-12 lg:w-16 lg:h-16 transform -rotate-6 opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;
