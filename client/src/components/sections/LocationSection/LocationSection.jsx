import React from "react";
import "./LocationSection.css";
import treeImage from "../../../assets/vaporwave trees.png";
import flagImage from "../../../assets/grunge_pinoy_flag.png";
import cebuImage from "../../../assets/cebu_cropped_nobg.png";

const LocationSection = () => {
  return (
    <div
      id="location-section"
      className="m-0 p-0 h-screen w-full relative overflow-hidden lg:h-screen"
    >
      <div className="location-gradient-container w-full h-full absolute top-0 left-0">
        <div className="location-container m-0 p-0 flex flex-col-reverse lg:flex-row relative lg:mt-10">
          <div className="cebu-container flex flex-row w-full lg:w-1/2">
            <div className="cebu-and-flag mx-auto mt-25 lg:mt-45 flex flex-row items-end">
              <img
                className="cebu absolute z-10 w-1/2 lg:w-1/3"
                src={cebuImage}
                alt="cebu image"
              />
              <img
                className="flag relative z-20 h-auto block w-3/5 lg:w-1/5 ml-25 lg:ml-10"
                src={flagImage}
                alt="flag image"
              />
            </div>
          </div>
          <div className="tree-container relative lg:w-1/2">
            <img
              className="tree absolute z-10 h-auto block w-full lg:w-3/5 mt-10 lg:mt-0 left-1/4 lg:left-0 transform -translate-x-1/4 lg:transform-none"
              src={treeImage}
              alt="tree image"
            />
            <div className="location-title px-3 py-1 rounded-3xl float-left ml-5 mt-5 lg:w-2/5 lg:ml-0 lg:mt-0">
              <h1 className="font-normal text-4xl lg:text-5xl">
                <span className="question-emphasis font-extralight italic">
                  Where
                </span>{" "}
                am I located?
              </h1>
            </div>
            <div className="location-information px-3 py-1 rounded-3xl float-right mr-5 lg:w-2/5 lg:mr-0">
              <p className="text-xl lg:text-2xl">
                Currently coding life away in sunny <i>Cebu</i>, at the center
                of <i>Visayas, Philippines</i>
              </p>
            </div>
            <div className="location-title px-3 py-1 rounded-3xl float-left ml-5 mt-5 lg:w-2/5 lg:ml-0 lg:mt-0">
              <h1 className="font-normal text-4xl lg:text-5xl">
                <span className="question-emphasis font-extralight italic">
                  Where
                </span>{" "}
                am I studying?
              </h1>
            </div>
            <div className="location-information px-3 py-1 rounded-3xl float-right mr-5 lg:w-2/5 lg:mr-0">
              <p className="text-xl lg:text-2xl">
                Currently studying Computer Science at{" "}
                <i>The University of San Carlos</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
