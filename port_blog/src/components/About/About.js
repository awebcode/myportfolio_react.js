import React from "react";
import "./about.css";
const About = () => {
  return (
    <>
      <div className="about">
        <div className="container">
          <h1 className="main-title">
            <span>Who</span> I AM<span>?</span>
          </h1>
          <div className="about-main">
            <div className="about-img">
              <img src="/blog.png" alt="" />
            </div>
            <div className="about-content">
              <p>My Name Is?</p>
              <h3>Md Asikur Rahman</h3>
              <h1>
                <span>Full-Stack</span> Web Developer <span>MERN-STACK</span>
              </h1>
              <p>Three Years + Experience!</p>
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
