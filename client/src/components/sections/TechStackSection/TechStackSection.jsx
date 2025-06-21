import React from 'react'
import './TechStackSection.css';

// languages and frameworks
import htmlCssJsImage from "../../../assets/html_css_js.png";
import mongodbImage from "../../../assets/mongodb.png";
import expressJsImage from "../../../assets/express.js.png";
import reactImage from "../../../assets/react.png";
import nodeJsImage from "../../../assets/node.js.png";
import pythonImage from "../../../assets/python.png";

// tools and platforms
import githubImage from "../../../assets/github-logo.png";
import firebaseImage from "../../../assets/firebase logo.png";
import jupyterImage from "../../../assets/Jupyter_logo.svg.png";
import figmaImage from "../../../assets/figma.png";
import gitImage from "../../../assets/git logo.png";

// things i'm exploring

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
                <img src={htmlCssJsImage} alt="html css javascript image" />
              </div>
              <div className="mongo-express-react">
                <img src={mongodbImage} alt="mongodb image" />
                <img src={expressJsImage} alt="expressjs image" />
                <img src={reactImage} alt="react image" />
              </div>
              <div className="node-python">
                <img src={nodeJsImage} alt="nodejs image" />
                <img src={pythonImage} alt="python image" />
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="tools-and-platforms">
              <div className="subtitle">
                <h2>Tools and Platforms</h2>
              </div>
              
            </div>
            <div className="currently-exploring">
              <div className="subtitle">
                <h2>Currently Exploring</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStackSection