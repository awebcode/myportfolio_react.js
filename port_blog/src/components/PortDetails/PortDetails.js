import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Data } from "../data/Data";
import "./details.css"
const PortDetails = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const {id} = useParams();
  useEffect(() => {
    if (id) {
      Data.forEach((e) => {
        if (String(e.id) === id) return setData(e);
      });
    }
  }, []);
  return (
    <div className="details">
      <div className="container">
        {" "}
        <div className="details-main">
          <div className="details-img">
            <img src={data?.image} alt="" />
          </div>
          <div className="details-content">
           
              <span>{data?.desc}</span>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortDetails;
