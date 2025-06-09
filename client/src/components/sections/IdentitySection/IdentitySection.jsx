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
                  <div className="statue-wrapper">
                    <div className="statue-ellipse statue-ellipse-1"></div>
                    <div className="statue-ellipse statue-ellipse-2"></div>
                    <img className="statue" src={statueImage} alt="vaporwave statue image" />
                  </div>
                </div>
                <div className="pillars-container">
                  <div className="pillar">
                    <div className="title">
                      <h1><span className="question-emphasis">Who</span> am I, really?</h1>
                    </div>
                    <img src={pillarImage} alt="pillar image" className="pillar-image pillar-right" />
                  </div>
                  <div className="pillar">
                    <img src={pillarImage} alt="pillar image" className="pillar-image pillar-left" />
                    <div className="information information-1">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lorem ut molestie luctus, sapien orci suscipit neque, sed venenatis lorem</p>
                    </div>
                  </div>
                  <div className="pillar">
                    <div className="information information-2">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lorem ut molestie luctus, sapien orci suscipit neque, sed venenatis lorem</p>
                    </div>
                    <img src={pillarImage} alt="pillar image" className="pillar-image pillar-right" />
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IdentitySection