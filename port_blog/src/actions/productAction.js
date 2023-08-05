import axios from "axios";
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_ALL_PRODUCTS_FAIL, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_USER_PRODUCTS_FAIL, GET_ALL_USER_PRODUCTS_REQUEST, GET_ALL_USER_PRODUCTS_SUCCESS, PRODUCT_CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants";
import { GET_ALL_USERS_SUCCESS } from "../constants/userConstants";


export const createProduct = (productData) => async (dispatch) => {
try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
   const config = {
     headers: { "Content-Type": "multipart/formdata" },
   };

    const { data } = await axios.post("/api/v1/create", productData, config)
    dispatch({ type: CREATE_PRODUCT_SUCCESS,payload:data });
} catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAIL,payload:error.response.data.msg });
}

};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/get-details/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response.data.msg });
  }
};
export const getAllProducts = (keyword="",sort="",category) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
     let link = `/api/v1/get?keyword=${keyword}&sort=${sort}`;
    
     if (category) {
       link = `/api/v1/get?keyword=${keyword}&sort=${sort}&category=${category}`;
     }
    const { data } = await axios.get(link);
    dispatch({ type:GET_ALL_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type:GET_ALL_PRODUCTS_FAIL, payload: error.response.data.msg });
  }
};
export const getAllUserProducts =
  (keyword = "", sort = "", category) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_USER_PRODUCTS_REQUEST });
      let link = `/api/v1/get/user/products?keyword=${keyword}&sort=${sort}`;

      if (category) {
        link = `/api/v1/get/user/products?keyword=${keyword}&sort=${sort}&category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: GET_ALL_USER_PRODUCTS_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({ type: GET_ALL_USER_PRODUCTS_FAIL, payload: error.response.data.msg });
    }
  };
export const updateProduct = (id,productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
   const config = {
     headers: { "Content-Type": "multipart/formdata" },
   };

    const { data } = await axios.put(`/api/v1/update/${id}`, productData, config);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data.msg });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type:DELETE_PRODUCT_REQUEST });
   
    const { data } = await axios.delete(`/api/v1/delete/${id}`);
    dispatch({ type:DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type:DELETE_PRODUCT_FAIL, payload: error.response.data.msg });
  }
};
export const productClearErrors = () =>async(dispatch)=> {
  dispatch({type:PRODUCT_CLEAR_ERRORS})
}