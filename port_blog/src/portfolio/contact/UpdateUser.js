import React, { useEffect, useState } from "react";
import { clearHistoryAction, loadUser, register, updateProfile, updateProfilePic } from "../../actions/userAction";
import "./contact.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UpdateUser = () => {
     const navigate = useNavigate();
     const { user } = useSelector((state) => state.user);
     const { isUpdated, isUpdatedPic, loading } = useSelector(
       (state) => state.updateUser
     );
  const dispatch = useDispatch();
    const [name, setName] = useState();
     const [email, setEmail] = useState();
 
  const [Avatar, setAvatar] = useState("");
  const [showAvatar, setShowAvatar] = useState("");
  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
   
    formData.set("avatar", Avatar);
      dispatch(updateProfile(formData));
       dispatch(updateProfilePic(formData));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setShowAvatar(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
    };
     useEffect(() => {
       if (user) {
         setShowAvatar(user?.avatar?.url);
         setName(user.name);
         setEmail(user.email);
       }
       if (isUpdated === true && isUpdatedPic === true) {
         navigate("/account");
         dispatch(loadUser());
         dispatch(clearHistoryAction());
       }
     }, [user, isUpdated, isUpdatedPic]);
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          <span>Update Profile.</span>
        </h1>
        <div className="contact-main">
          <div class="container">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <form onSubmit={registerSubmit}>
                  <input
                    type="text"
                    class="field"
                    placeholder="Your Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    class="field"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />

                  <input
                    type="file"
                    class="field"
                    name="avatar"
                    onChange={registerDataChange}
                  />
                  <img
                    src={showAvatar}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />

                  <p>
                    do you want to go account? <a href="/account">Account</a>
                  </p>
                  <button class="btn" type="submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
