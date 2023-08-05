import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { offerData } from "./OfferData";

const OfferCard = (props) => {
  const [first, setfirst] = useState(false);
  console.log(first)
     const ref = useRef(null);
     useEffect(() => {
       let handler = (e) => {
         if (!ref.current.contains(e.target)) {
           setfirst(false);
         }
       };
       document.addEventListener("mousedown", handler);
     }, []);
  return (
    <>
      <div
        className="offer-content"
        ref={ref}
        onClick={() => setfirst(!first)}
      >
        <h1>{props.v.company_name}</h1>
        <p>
          See More{" "}
          <span>
            <ArrowRightAlt />
          </span>
        </p>
      </div>
      {first && (
        <>
          <Modal setfirst={setfirst} v={props.v} />
        </>
      )}
    </>
  );
};

export default OfferCard;
