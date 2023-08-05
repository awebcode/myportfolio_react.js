import * as types from "../constants/tagConstants";

const tagReducer = (state = "", action) => {
  switch (action.type) {
    case types.CREATE_TAG:
      return [action.payload, ...state];

    case types.GET_TAGS:
      return action.payload;

    case types.UPDATE_TAG:
      return state.map((item) =>
        item._id === action.payload._id ? { ...item, name: action.payload.name } : item
      );

    case types.DELETE_TAG:
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default tagReducer;
