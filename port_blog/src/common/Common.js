import React from "react";
import "./common.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Typewriter from "typewriter-effect";
const Common = (props) => {
  const [text] = useTypewriter({
    words: [props.type0, props.type, props.type1, props.type2, props.type3, props.type4],
    loop: true,
    typeSpeed: 200,
    deleteSpeed: 80,
    
  });

  return (
    <>
      <div className="common">
        <div className="container">
          <div className="common-main">
            <div className="common-content">
              <p>{props.title1}</p>
              <h3>
                {props.title2} <span>{props.span2}</span>
              </h3>
              {props.type0 && (
                <h1>
                  <span className="type-w">
                    <span className="type-w-1"> I'M A </span>
                    <span>
                      <Typewriter
                        options={{
                          strings: [
                            props.type0,
                            props.type,
                            props.type1,
                            props.type2,
                            props.type3,
                            props.type4,
                          ],
                          delay: 75,
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                  </span>
                </h1>
              )}

              <h1>
                {props.title3} <br />
                <span>{props.span3}</span>
              </h1>
              {props.ty && (
                <h1>
                  <span className="type-w">
                    <span className="type-w-1"> Expert </span>{" "}
                    <span>
                      {" "}
                      <Typewriter
                        options={{
                          strings: [
                            props.ty,

                            props.ty1,
                            props.ty2,
                            props.ty3,
                            props.ty4,
                            props.ty5,
                            props.ty6,
                          ],
                          delay: 75,
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                  </span>
                </h1>
              )}
              <p>{props.title4}</p>
              <p>
                {props.span4}
                <br />
                <span>{props.span5}</span>
              </p>
              <button type="">
                <a href={props.btncv} download>
                  {props.btntext}
                </a>
              </button>
            </div>
            <div className="common-img">
              <img src={props.img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
