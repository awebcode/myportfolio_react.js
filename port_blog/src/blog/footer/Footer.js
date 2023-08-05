import React from "react";
import "./footer.css";
import Facebook from "@material-ui/icons/Facebook";
import Whatsapp from "@material-ui/icons/WhatsApp";
import Twitter from "@material-ui/icons/Twitter";
import Instragram from "@material-ui/icons/Instagram";
import Youtube from "@material-ui/icons/YouTube";
import Mail from "@material-ui/icons/Mail";
import { Data } from "../data/Data";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const FooterBlog = () => {
  const { products } = useSelector((state) => state.allProducts);
  const category = [
    "Funny",
    "Entertainment",
    "World",
    "Politics",
    "Sports",
    "Fun",
    "movie",
    "web design",
    "mern",
    "problem solving",
    "web development",
    "react",
    "node js",
    "mongodb",
  ];
  const tag = [
    "#Funny",
    "#Entertainment",
    "#World",
    "#Politics",
    "#Sports",
    "#Fun",
    "#moveie",
    "#web design",
    "#mern",
    "#problem solving",
    "#web development",
    "#react",
    "#node js",
    "#mongodb",
  ];
  return (
    <>
      <div className="">
        <div className="footer">
          <div>
            <h2>Popular Posts</h2>
            <ul className="popular">
              {products
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 6)
                .map((v, i) => {
                  return (
                    <li>
                      <NavLink to={`/blog/${v._id}`}>
                        <a href="#">
                          <img src={v?.images[0]?.url} alt="" />
                        </a>
                        <p>{v.title.slice(0, 20)}</p>
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h2>Category</h2>
            <ul>
              {category.map((v, i) => {
                return (
                  <li>
                    <a href="#">{v}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Tag</h2>
            <ul>
              {tag.map((v, i) => {
                return (
                  <li>
                    <a href="#">{v}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Follow Me</h2>
            <ul className="social">
              <li>
                <a href="#">
                  <Facebook />{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <Whatsapp />{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <Twitter />{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <Instragram />{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <Youtube />{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <Mail />{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="center">
          Asikur<span>2023</span>@all Right <span>Reserved..</span>
        </p>
      </div>
    </>
  );
};

export default FooterBlog;
