import React from 'react'
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
const Modal = (props) => {
  return (
    <>
      {" "}
      <div className="modal-prot">
                <p className="cross" onClick={() => props.setfirst(false)}>
                  <ClearIcon />
                </p>
                <div className="modal-title">
                  <p>
                    I Will Create Custom <span>Website Design For You</span>
                  </p>
                  <h1>{props.v.company_name}</h1>
                </div>
                <div className="modal-content">
                  <p>
                    <span>
                      <CheckIcon />
                    </span>
                    Custom Design
                  </p>
                  <p>
                    <span>
                      <CheckIcon />
                    </span>
                    Unique Design
                  </p>
                  <p>
                    <span>
                      <CheckIcon />
                    </span>
                    Unlimited Revisions.
                  </p>
                  <p>
                    <span>
                      <CheckIcon />
                    </span>
                    Friendly Contact.
                  </p>
                  <p>
                    <span>
                      <CheckIcon />
                    </span>
                    Custom Themes For You.
                  </p>
                  <p>
                    <span>
                      <CheckIcon />
                    </span>
                    24/7 Active.
                  </p>
                  <p>
                    <span>
                      <CheckIcon />
                    </span>
                    Custom Design
                  </p>
                </div>
              </div>
    </>
  )
}

export default Modal