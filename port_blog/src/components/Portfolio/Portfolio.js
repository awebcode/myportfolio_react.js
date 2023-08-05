import React, { useState } from "react";
import "./portfolio.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Data } from "../data/Data";
import Pagination from "../pagination/Pagination";
const Portfolio = () => {
  
     const [data, setData] = useState(Data);
     
     const filter = (e) => {
       const updFilter = Data.filter((w) => {
         return w.cat === e;
       });
       setData(updFilter);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      {" "}
      <div className="portfolio">
        {" "}
        <div className="container">
          <h1 className="main-title">
            What <span>Includes</span> In My <span>Portfolios</span>
          </h1>
          <div className="btn-container">
            <button onClick={() => setData(Data)}>All</button>
            <button onClick={() => filter("ecommerce")}>E-Commerce</button>
            <button onClick={() => filter("portfolio")}>Portfolio</button>

            <button onClick={() => filter("3d")}>3d Website</button>
          </div>
          <div className="portfolio-main">
            {" "}
            {currentPosts.map((d, index) => {
              return (
                <>
                  {" "}
                  <div className="portfolio-img" key={index}>
                    <a href={`/portfolio/${d.id}`}>
                      {" "}
                      <img src={d.image} alt="" />
                    </a>

                    <div className="overlay">
                      <p>
                        {d.desc.slice(0, 100)}
                        <span>
                          Collaborte with cross-functional teams including designers,{" "}
                          <a href={`/portfolio/${d.id}`}>
                            See Now
                            <ArrowOutwardIcon />
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
            <Pagination
              totalPosts={data.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
