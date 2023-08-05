import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import { clearHistoryAction, loadUser, updatePassword } from "../../actions/userAction";
const UpdatePassword = () => {
     const { user } = useSelector((state) => state.user);
     const { isUpdated, isUpdatedPic, loading, error } = useSelector(
       (state) => state.updateUser
     );
  const dispatch = useDispatch();
  const [Password, setPassword] = useState({
    oldpassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { oldpassword, newPassword, confirmPassword } =Password;

  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldpassword);
    formData.set("newPassword",newPassword);
    formData.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(formData));
  };
  const registerDataChange = (e) => {
    setPassword({ ...Password, [e.target.name]: e.target.value });
    };
    useEffect(() => {
      if (isUpdated === true) {
        navigate("/account");
        dispatch(loadUser());
        dispatch(clearHistoryAction());
      }
      if (error) {
        alert(error);
      }
    }, [user, isUpdated, error]);
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          Update<span> Password. </span>
        </h1>
        <div className="contact-main">
          <div class="container">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <form onSubmit={registerSubmit}>
                  <input
                    type="password"
                    class="field"
                    placeholder="Your Old Password"
                    value={oldpassword}
                    onChange={registerDataChange}
                    name="oldpassword"
                  />
                  <input
                    type="password"
                    class="field"
                    placeholder="New Password"
                    name="newPassword"
                    value={newPassword}
                    onChange={registerDataChange}
                  />
                  <input
                    type="password"
                    class="field"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={registerDataChange}
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

export default UpdatePassword;
