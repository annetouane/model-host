// action type
import {
  MODEL_DATA,
  STORE_PARAMS,
  DELETE_PROJECT,
  NEW_PROJECT,
  UPDATE_PROJECT,
} from "./types";
import { setAlert } from "./alert";

// utilities
import api from "../utilities/api";

export const storeParams = (formData) => (dispatch) => {
  dispatch({
    type: STORE_PARAMS,
    payload: formData,
  });
};

export const postInputForm = (formData, id) => async (dispatch) => {
  // insert the form into a new variable
  const postInput = formData;
  // insert the user ID in the form data
  postInput.user = id;
  try {
    const res = await api.post("/input", postInput);
    console.log(res.data);
    dispatch({
      type: MODEL_DATA,
      payload: res.data,
    });
    dispatch({
      type: STORE_PARAMS,
      payload: formData,
    });
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

export const postEmail = (email) => async (dispatch) => {
  console.log("mail", email);
  try {
    if (process.env.NODE_ENV === "production") {
      await api.post("/user-email", { email: email });
      // setAlert({ msg: res.data });
      console.log("heroku");
    } else {
      await api.post("/user-email", { email: email });
      // setAlert({ msg: res.data });
      console.log("local");
    }
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/input/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: { idProjet: res.data },
    });
  } catch (err) {
    console.log(err);
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

export const saveToReducer = (formData) => async (dispatch) => {
  dispatch({
    type: NEW_PROJECT,
    payload: { idProjet: formData },
  });
};

export const updateToReducer = (formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROJECT,
    payload: { idProjet: formData },
  });
};
