import axios from "axios"
import { CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_PICTURE_FAIL, UPDATE_USER_PICTURE_REQUEST, UPDATE_USER_PICTURE_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_ROLE_FAIL, UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants"

export const register = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const {data}=await axios.post("/api/v1/register",userdata,config)
        dispatch({ type: REGISTER_SUCCESS,payload:data.user });
        
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
}
export const login = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/login", userdata, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
   
    const { data } = await axios.get("/api/v1/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.msg });
  }
};
//allusers
export const getallUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const { data } = await axios.get("/api/v1/all-users");
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error.response.data.msg });
  }
};
//LOGOUT
export const logoutAction = (userData, setAvatarPreview) => async (dispatch) => {
  try {
   

    

    const { data } = await axios.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/user/update`, userData, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateProfilePic = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PICTURE_REQUEST });
 
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/user/update/pic`, userData, config);

    dispatch({ type: UPDATE_USER_PICTURE_SUCCESS, payload: data });
   
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PICTURE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearHistoryAction = () => async (dispatch) => {

  dispatch({type:CLEAR_ERRORS})
};
//update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/v1/update/password", passwords, config);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.msg });
  }
};
// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/single-user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};
//delete user
// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/delete/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User role
export const updateUserRole = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_ROLE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/admin/user/update/role/${id}`, userData, config);

    dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ROLE_FAIL,
      payload: error.response.data.message,
    });
  }
};
