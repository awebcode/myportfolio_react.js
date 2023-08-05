import { CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_PICTURE_FAIL, UPDATE_USER_PICTURE_REQUEST, UPDATE_USER_PICTURE_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_ROLE_FAIL, UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants";

export const userReducer = (state = { user: {},isAuthenticated:false }, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
          error: null,
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
   
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
          error: null,
          created: true,
        };
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
          error: null,
          created: false,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: "",
          error: action.payload,
        };
      case LOGOUT_FAIL:
        return {
          ...state,
          loading: false,

          error: action.payload,
        };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOAD_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          error: action.payload,
        };

      default:
        return state;
    }
}
export const updateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case UPDATE_USER_PICTURE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case DELETE_USER_REQUEST:
      case UPDATE_USER_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        isUpdated: false,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
     case UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isUpdated: action.payload.success,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case UPDATE_USER_PICTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isUpdatedPic: action.payload.success,
        error: null,
      };
    case UPDATE_USER_FAIL:
    case UPDATE_USER_PICTURE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case DELETE_USER_FAIL:
    case UPDATE_USER_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        error: "",
        isUpdatedPic: false,
      };

    default:
      return state;
  }
};
export const clearHistory = (state={user:{}},action) => {
  switch (action.type) {
    case CLEAR_ERRORS: return {
      ...state,
      loading: false,
      isUpdated: "",
      error: "",
      created:false
      
    }
    default:
      return state;
  }
}
export const allusersReducer = (state={users:{}},action) => {
   switch (action.type) {
     case GET_ALL_USERS_REQUEST:
    
       return {
         ...state,
         loading: true,
         users: "",
         error: null,
       };
     case GET_ALL_USERS_SUCCESS:
       // case UPDATE_USER_PICTURE_SUCCESS:
       return {
         ...state,
         loading: false,
         users: action.payload,
        
         error: null,
       };
     case GET_ALL_USERS_FAIL:
       return {
         ...state,
         loading: false,
         users: "",

         error: action.payload,
       };
    
     case CLEAR_ERRORS:
       return {
         ...state,
         loading: false,
       
         error: "",
         
       };

     default:
       return state;
   }
}
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
