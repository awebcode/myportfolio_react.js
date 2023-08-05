import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalToggle({comment,setModal}) {
 
  
  return (
    <div>
      <Button style={{ position: "relative" }}>
        <img
          src={comment.image}
          alt=""
          style={{
            height: "100%",
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <h2 onClick={() => setModal(false)} style={{ position: "absolute",top:"-9%",right:"20%" }}>
          <CloseIcon />{" "}
        </h2>
      </Button>
    </div>
  );
}
export default ModalToggle