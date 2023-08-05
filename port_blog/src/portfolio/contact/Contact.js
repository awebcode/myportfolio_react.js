import React, { useEffect, useState } from "react";
import { clearHistoryAction, loadUser, register } from "../../actions/userAction";
import "./contact.css";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import { CLEAR_ERRORS } from "../../constants/userConstants";
const Contact = () => {
  const navigate=useNavigate()
  const {user:currUser,loading,created,error}=useSelector(s=>s.user)
  const dispatch=useDispatch()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [Avatar, setAvatar] = useState("");
  const [showAvatar, setShowAvatar] = useState("");
  const registerSubmit = (e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.set("name", name);
     formData.set("email", email);
     formData.set("password", password);
     formData.set("avatar", Avatar);
     dispatch(register(formData));
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
    if (created===true) {
      toast.success("Account Created!")
      navigate("/account")
      // dispatch({ type: CLEAR_ERRORS });
      dispatch(loadUser())
    }
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS });
    }
  },[dispatch,created,error])
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          <span>Contact </span>Me.
        </h1>
        <div className="contact-main">
          <div class="container">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <h2>Contact Me</h2>
                <form onSubmit={registerSubmit}>
                  <input
                    type="text"
                    class="field"
                    placeholder="Your Name"
                    value={name}
                    name="name"
                    onChange={registerDataChange}
                  />
                  <input
                    type="email"
                    class="field"
                    placeholder="Your Email"
                    value={email}
                    onChange={registerDataChange}
                    name="email"
                  />
                  <input
                    type="password"
                    class="field"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <input
                    type="file"
                    class="field"
                    name="avatar"
                    onChange={registerDataChange}
                  />
                  {showAvatar && (
                    <img
                      src={showAvatar}
                      alt=""
                      style={{ height: "50px", width: "50px" }}
                    />
                  )}

                  <p>
                    alreay have an account? <a href="/login">login</a>
                  </p>
                  <button class="btn" type="submit" disabled={loading}>
                    {loading ? "loading" : "Send"}
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

export default Contact;
