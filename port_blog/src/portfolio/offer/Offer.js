import React, { useEffect, useRef, useState } from "react";
import RightA from "@mui/icons-material/ArrowRightAlt";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./offer.css";
import { offerData } from "./OfferData";
import Modal from "./Modal";
import OfferCard from "./OfferCard";
const Offer = () => {
  const [first, setfirst] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <div className="offer">
        <div className="container">
          <h1 className="main-title">
            {" "}
            <p style={{ textAlign: "center" }}>
              <span> My Featured</span> Services.
            </p>
            What I <span>Offer?.</span>
          </h1>
          <div className="offer-main">
            {offerData?.map((v, i) => {
              return (
                <>
                  <OfferCard v={v} />
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
