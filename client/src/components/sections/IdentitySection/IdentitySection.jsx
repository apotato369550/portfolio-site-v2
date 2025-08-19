import React from "react";
import "./IdentitySection.css";
import statueImage from "../../../assets/vaporwave statue.png";
import pillarImage from "../../../assets/vaporwave pillar.png";

const IdentitySection = () => {
  return (
    <div id="identity-section" className="m-0 p-0 h-screen w-full lg:h-screen">
      <div className="identity-gradient-container h-full w-full m-0 p-0">
        <div className="identity-container h-full w-full m-0 p-0 flex flex-col lg:flex-row">
          <div className="statue-container my-5 lg:my-0 lg:w-1/2 lg:mt-10">
            <div className="statue-wrapper relative w-3/4 mx-auto">
              <div className="statue-ellipse statue-ellipse-1 absolute rounded-full mt-40 lg:mt-50 z-10 w-3/4 lg:w-1/2 h-14 lg:h-20 transform rotate-30"></div>
              <div className="statue-ellipse statue-ellipse-2 absolute rounded-full mt-40 lg:mt-50 z-10 w-4/5 lg:w-1/2 h-16 lg:h-22 transform rotate-160"></div>
              <img
                className="statue w-4/5 lg:w-3/5 lg:max-w-md lg:ml-8 z-20 relative"
                src={statueImage}
                alt="vaporwave statue image"
              />
            </div>
          </div>
          <div className="pillars-container my-5 lg:my-0 lg:w-1/2 lg:relative">
            <div className="pillar flex flex-row items-center justify-between mx-5 lg:mx-0 lg:gap-3 lg:mb-5">
              <div className="identity-title px-3 py-1 rounded-3xl lg:absolute lg:right-5 lg:z-20">
                <h1 className="font-normal text-4xl lg:text-5xl">
                  <span className="question-emphasis font-extralight italic">
                    Who
                  </span>{" "}
                  am I, really?
                </h1>
              </div>
              <img
                src={pillarImage}
                alt="pillar image"
                className="pillar-image pillar-right w-1/3 lg:w-1/5 lg:ml-25"
              />
            </div>
            <div className="pillar flex flex-row items-center justify-between mx-5 lg:mx-0 lg:gap-3 lg:mb-5">
              <img
                src={pillarImage}
                alt="pillar image"
                className="pillar-image pillar-left w-1/3 lg:w-1/5 lg:ml-5"
              />
              <div className="identity-information identity-information-1 px-3 py-1 rounded-3xl lg:absolute lg:left-5 lg:z-20">
                <p className="text-lg lg:text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  commodo, lorem ut molestie luctus, sapien orci suscipit neque,
                  sed venenatis lorem
                </p>
              </div>
            </div>
            <div className="pillar flex flex-row items-center justify-between mx-5 lg:mx-0 lg:gap-3">
              <div className="identity-information identity-information-2 px-3 py-1 rounded-3xl lg:absolute lg:right-5 lg:z-20">
                <p className="text-lg lg:text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  commodo, lorem ut molestie luctus, sapien orci suscipit neque,
                  sed venenatis lorem
                </p>
              </div>
              <img
                src={pillarImage}
                alt="pillar image"
                className="pillar-image pillar-right w-1/3 lg:w-1/5 lg:ml-25"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;
