import { postAPI, getAPI, patchAPI, deleteAPI } from "./FetchData";

import {
  
  DELETE_TAG,
  UPDATE_TAG,
  GET_TAGS,
  CREATE_TAG,
} from "../constants/tagConstants";

import { ALERT } from "../constants/tagConstants";

export const createTAG = (name) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await postAPI("tag", { name });

    dispatch({
      type: CREATE_TAG,
      payload: res.data.newTag,
    });

    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const getTags = () => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await getAPI("tag");

    dispatch({
      type: GET_TAGS,
      payload: res.data.tags,
    });

    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const updateTAG = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TAG, payload: data });

    await patchAPI(`tag/${data._id}`, {
      name: data.name,
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const deleteTAG = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TAG, payload: id });
    await deleteAPI(`tag/${id}`);
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};
