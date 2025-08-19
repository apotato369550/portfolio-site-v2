import React from "react";
import "./TechStackSection.css";

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
    <div
      id="tech-stack-section"
      className="m-0 p-0 h-screen w-full relative overflow-hidden lg:h-screen"
    >
      <div className="tech-stack-image-container h-full w-full absolute top-0 left-0 min-h-screen">
        <div className="tech-stack-container flex flex-col mx-auto lg:flex-row lg:h-full">
          <div className="left-container w-4/5 lg:w-2/5 mx-auto mt-7 lg:mt-7 lg:ml-5 lg:h-95">
            <div className="tech-stack-title px-3 py-1 rounded-3xl mb-5 lg:mb-5">
              <h1 className="font-normal text-4xl lg:text-5xl">
                <span className="question-emphasis font-extralight italic">
                  What
                </span>{" "}
                do I work with?
              </h1>
            </div>
            <div className="languages-and-frameworks px-3 py-1 rounded-3xl mb-5 lg:mb-5">
              <div className="subtitle mb-2">
                <h2 className="text-2xl lg:text-3xl">
                  Languages and Frameworks
                </h2>
              </div>
              <div className="html-css-js w-full flex mb-2">
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={htmlImage}
                  alt="html image"
                />
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={cssImage}
                  alt="css image"
                />
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={jsImage}
                  alt="javascript image"
                />
              </div>
              <div className="mongo-express-react w-full flex mb-2">
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={mongodbImage}
                  alt="mongodb image"
                />
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={expressJsImage}
                  alt="expressjs image"
                />
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={reactImage}
                  alt="react image"
                />
              </div>
              <div className="node-python w-full flex mb-2">
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={nodeJsImage}
                  alt="nodejs image"
                />
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={pythonImage}
                  alt="python image"
                />
              </div>
            </div>
          </div>
          <div className="right-container w-4/5 lg:w-2/5 mx-auto lg:mr-5 lg:h-95">
            <div className="tools-and-platforms px-3 py-1 rounded-3xl mb-5 lg:mb-5">
              <div className="subtitle mb-2">
                <h2 className="text-2xl lg:text-3xl">Tools and Platforms</h2>
              </div>
              <div className="tools-and-platforms-icons w-full flex mb-2">
                <div className="github-and-firebase mx-auto flex flex-col lg:flex-row">
                  <img
                    className="tech-stack-icon h-20 lg:h-12 mx-auto"
                    src={githubImage}
                    alt="github logo"
                  />
                  <img
                    className="tech-stack-icon h-20 lg:h-12 mx-auto"
                    src={firebaseImage}
                    alt="firebase logo"
                  />
                </div>
                <div className="jupyter mx-auto">
                  <img
                    className="tech-stack-icon h-20 lg:h-12 mx-auto"
                    src={jupyterImage}
                    alt="jupyter logo"
                  />
                </div>
                <div className="figma-and-git mx-auto flex flex-col lg:flex-row">
                  <img
                    className="tech-stack-icon h-20 lg:h-12 mx-auto"
                    src={figmaImage}
                    alt="figma logo"
                  />
                  <img
                    className="tech-stack-icon h-20 lg:h-12 mx-auto"
                    src={gitImage}
                    alt="git logo"
                  />
                </div>
              </div>
            </div>
            <div className="currently-exploring px-3 py-1 rounded-3xl mb-5 lg:mb-5">
              <div className="subtitle mb-2">
                <h2 className="text-2xl lg:text-3xl">Currently Exploring</h2>
              </div>
              <div className="c-and-scikitlearn w-full flex mb-2">
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={cImage}
                  alt="c programming language"
                />
                <img
                  className="tech-stack-icon h-20 lg:h-12 mx-auto"
                  src={scikitlearnImage}
                  alt="scikit-learn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackSection;
