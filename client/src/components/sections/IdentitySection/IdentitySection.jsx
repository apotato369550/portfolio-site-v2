import React from 'react'
import './IdentitySection.css';
import statueImage from "../../../assets/vaporwave statue.png";
import pillarImage from "../../../assets/vaporwave pillar.png";

const IdentitySection = () => {
  return (
    <div id="identity-section">
        <div className="identity-gradient-container">
            <div className="identity-container">
                <div className="statue-container">
                  <img className="statue" src={statueImage} alt="vaporwave statue image" />
                  <div className="statue-ellipse-1"></div>
                  <div className="statue-ellipse-2"></div>
                </div>
                <div className="pillars-container">

                </div>
            </div>
        </div>
    </div>
  )
}

export default IdentitySection