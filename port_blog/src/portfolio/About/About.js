import React from "react";
import "./about.css";
const About = () => {
  return (
    <>
      <div className="about" id="about">
        <div className="container">
          <h1 className="main-title">
            <span>About</span> Me<span>!</span>
          </h1>
          <div className="about-main">
            <div className="about-img-port">
              <img src="/port.png" alt="" />
              <div className="about-completed-sec">
                <div className="about-completed">
                  <h1>Experience.</h1>
                  <p>
                    3Years + <span>Experience</span>
                  </p>
                </div>
                <div className="about-completed">
                  <h1>Completed.</h1>
                  <p>
                    1000 + <span>Projects</span>
                  </p>
                </div>
                <div className="about-completed">
                  <h1>Support.</h1>
                  <p>
                    24/ <span>7 online support.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="about-content-port">
              <p>
                My <span>Name Is</span>
              </p>
              <h3>Md Asikur Rahman</h3>
              <h1>
                <span>Full-Stack</span> Web Developer <span>MERN!</span>
              </h1>
              <h3>
                <span>Three</span> Years <span>+</span> Experience!
              </h3>
              <p>
                Developing and maintaining web applications using React.js and other
                related technologies.
                <span>
                  Collaborating with cross-functional teams including designers,
                </span>{" "}
                product managers, and other developers to create high-quality products.
                Implementing responsive design and ensuring cross-browser compatibility.
                <span>
                  {" "}
                  Participating in code reviews and providing constructive feedback to
                  other developers.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
