import React from 'react'
import './LocationSection.css';
import treeImage from "../../../assets/vaporwave trees.png";
import flagImage from "../../../assets/grunge_pinoy_flag.png";
import cebuImage from "../../../assets/cebu_cropped_nobg.png";


const LocationSection = () => {
  return (
    <div id="location-section">
        <div className="location-gradient-container">
            <div className="location-container">
                <div className="cebu-container">
                    <img className="cebu" src={cebuImage} alt="cebu image" />
                    <img className="flag" src={flagImage} alt="flag image" />
                </div>
                <div className="tree-container">
                    <img className="tree" src={treeImage} alt="tree image" />
                    <div className="location-title">
                        <h1><span className="question-emphasis">Where</span> am I located?</h1>
                    </div>
                    <div className="location-information">
                        <p>Currently coding life away in sunny <i>Cebu</i>, at the center of <i>Visayas, Philippines</i></p>
                    </div>
                    <div className="location-title">
                        <h1><span className="question-emphasis">Where</span> did I study?</h1>
                    </div>
                    <div className="location-information">
                        <p>Currently studying Computer Science at <i>The University of San Carlos</i></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LocationSection