import React from 'react'
import './TechStackSection.css';

const TechStackSection = () => {
  return (
    <div id="tech-stack-section">
      <div className="tech-stack-image-container">
        <div className="tech-stack-container">
          <div className="left-container">
            <div className="tech-stack-title">
              <h1><span className="question-emphasis">What</span> do I work with?</h1>
            </div>
            <div className="languages-and-frameworks">
              <h2>Languages and Frameworks</h2>
            </div>  
          </div>
          <div className="right-container">
            <div className="tools-and-platforms">
              <h2>Tools and Platforms</h2>
            </div>
            <div className="currently-exploring">
              <h2>Currently Exploring</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechStackSection