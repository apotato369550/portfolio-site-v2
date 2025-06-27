import React from 'react'
import './TechStackSection.css';

// languages and frameworks
import htmlImage from "../../../assets/html_5_photo.png";
import cssImage from "../../../assets/css_photo.png";
import jsImage from "../../../assets/js_photo.png";


import mongodbImage from "../../../assets/mongodb.png";
import expressJsImage from "../../../assets/express.js.png";
import reactImage from "../../../assets/circle_react.png";
import nodeJsImage from "../../../assets/node.js.png";
import pythonImage from "../../../assets/python.png";

// tools and platforms
import githubImage from "../../../assets/github-logo.png";
import firebaseImage from "../../../assets/firebase logo.png";
import jupyterImage from "../../../assets/Jupyter_logo.svg.png";
import figmaImage from "../../../assets/figma.png";
import gitImage from "../../../assets/git logo.png";

// things i'm exploring
import cImage from "../../../assets/c_logo.png";
import scikitlearnImage from "../../../assets/scikitlearn logo.png";

const TechStackSection = () => {
  return (
    <div id="tech-stack-section">
      <div className="tech-stack-image-container">
        <div className="tech-stack-container">
          <div className="left-container">
            <div className="tech-stack-title">
              <h1>
                <span className="question-emphasis">What</span> do I work with?
              </h1>
            </div>
            <div className="languages-and-frameworks">
              <div className="subtitle">
                <h2>Languages and Frameworks</h2>
              </div>
              <div className="html-css-js">
                <img className="tech-stack-icon" src={htmlImage} alt="html image" />
                <img className="tech-stack-icon" src={cssImage} alt="css image" />
                <img className="tech-stack-icon" src={jsImage} alt="javascript image" />
              </div>
              <div className="mongo-express-react">
                <img className="tech-stack-icon" src={mongodbImage} alt="mongodb image" />
                <img className="tech-stack-icon" src={expressJsImage} alt="expressjs image" />
                <img className="tech-stack-icon" src={reactImage} alt="react image" />
              </div>
              <div className="node-python">
                <img className="tech-stack-icon" src={nodeJsImage} alt="nodejs image" />
                <img className="tech-stack-icon" src={pythonImage} alt="python image" />
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="tools-and-platforms">
              <div className="subtitle">
                <h2>Tools and Platforms</h2>
              </div>
              <div className="tools-and-platforms-icons">
                <div className="github-and-firebase">
                  <img className="tech-stack-icon" src={githubImage} alt="github logo" />
                  <img className="tech-stack-icon" src={firebaseImage} alt="firebase logo" />
                </div>
                <div className="jupyter">
                  <img className="tech-stack-icon" src={jupyterImage} alt="jupyter logo" />
                </div>
                <div className="figma-and-git">
                  <img className="tech-stack-icon" src={figmaImage} alt="figma logo" />
                  <img className="tech-stack-icon" src={gitImage} alt="git logo" />
                </div>
              </div>
            </div>
            <div className="currently-exploring">
              <div className="subtitle">
                <h2>Currently Exploring</h2>
              </div>
              <div className="c-and-scikitlearn">
                <img className="tech-stack-icon" src={cImage} alt="" />
                <img className="tech-stack-icon" src={scikitlearnImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStackSection