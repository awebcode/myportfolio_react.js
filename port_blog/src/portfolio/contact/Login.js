import React, { useEffect, useState } from "react";
import { loadUser, login} from "../../actions/userAction";
import "./contact.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLEAR_ERRORS } from "../../constants/userConstants";
import { toast } from "react-toastify";
const Login = () => {
 const navigate = useNavigate();
 const { user: currUser, loading, created, error,isAuthenticated } = useSelector((s) => s.user);
 const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  
  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
   
    dispatch(login(formData));
  };
  const registerDataChange = (e) => {
    
      setUser({ ...user, [e.target.name]: e.target.value });
    
  };
  useEffect(() => {
    if (isAuthenticated === true) {
       navigate("/account");
    }
    if (created === true) {
      toast.success("Successfully LoggedIn!");
       navigate("/account");
      // dispatch({ type: CLEAR_ERRORS });
      dispatch(loadUser());
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, created, error]);
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          <span>Login Your </span> Account.
        </h1>
        <div className="contact-main">
          <div class="container">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <h2>Contact Me</h2>
                <form onSubmit={registerSubmit}>
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

                  <p>
                    don't have an account? <a href="/">register</a>
                  </p>
                  <button class="btn" type="submit">
                    Send
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

export default Login;
