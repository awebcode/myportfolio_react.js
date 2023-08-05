import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, GET_ALL_PRODUCTS_FAIL, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_USER_PRODUCTS_FAIL, GET_ALL_USER_PRODUCTS_REQUEST, GET_ALL_USER_PRODUCTS_SUCCESS, PRODUCT_CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants";

export const createProductReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
        products: {},
        error: null,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,

        products: action.payload,
        error: null,
        created: true,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        products: {},
        error: action.payload,
      };
    case PRODUCT_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        created: false,
      };

    default:
      return state;
  }
};
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
          return {
            ...state,
            loading: true,
          };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case PRODUCT_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
       
        
      };
    default:
      return state;
  }
};
export const getAllProductReducer = (state = { products:[] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
    case GET_ALL_USER_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
        error: null,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
    case GET_ALL_USER_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,

        products: action.payload,
        error: null,
      };

    case GET_ALL_PRODUCTS_FAIL:
    case GET_ALL_USER_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
export const updDelproductReducer = (state = {product:{}}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        product: {},
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
          isDeleted: action.payload,
        
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
        product: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case PRODUCT_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        created: false,
        isDeleted: false,
        isUpdated:false
      };
    default:
      return state;
  }
};