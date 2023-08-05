import React, { useEffect, useState } from "react";
import { clearHistoryAction, getUserDetails, register, updateProfile, updateProfilePic, updateUserRole } from "../../actions/userAction";
import "./contact.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const UpdateUserRole = () => {
  const navigate = useNavigate();
 const { user } = useSelector((state) => state.user);
 const { loading, error, userDetails } = useSelector((state) => state.userDetails);
 const { isUpdated } = useSelector((state) => state.updateUser);
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
 const [role, setRole] = useState();
  const userId=useParams().id
  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);

    formData.set("role", role);
    dispatch(updateUserRole(userId,formData));
    
  };
 
  useEffect(() => {
      if (userId) {
        dispatch(getUserDetails(userId));
      setRole(userDetails?.role);
      setName(userDetails?.name);
      setEmail(userDetails?.email);
    }
    
      if (error) {
        alert(error);
        dispatch(clearHistoryAction());
      }

      // if (updateError) {
      //   alert(updateError);
      //   dispatch(clearErrors());
      // }

      if (isUpdated === true) {
        toast.success("User Updated Successfully");
        navigate("/dashboard/all-users");
        dispatch(clearHistoryAction());
      }
  }, [
    dispatch,
    userId,
    userDetails?.name,
    userDetails?.email,
    userDetails?.role,
   
    error,
    navigate,
    isUpdated,
  ]);
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          <span>Update Role</span>.
          
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
                  <select className="field" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="disabled">Disabled</option>
                  </select>

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

export default UpdateUserRole;
