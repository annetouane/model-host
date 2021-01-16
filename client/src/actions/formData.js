// action type
import {
  MODEL_DATA,
  STORE_PARAMS,
  DELETE_PROJECT,
  NEW_PROJECT,
  UPDATE_PROJECT,
  MODEL_TOGGLE,
  AUTH_ERROR,
  REMOVE_USER_PARAMS,
} from "./types";
import { setAlert } from "./alert";
import { authToggle, accountModalToggle, saveModalToggle } from "./modals";

// utilities
import api from "../utilities/api";

export const storeParams = (formData) => (dispatch) => {
  dispatch({
    type: STORE_PARAMS,
    payload: formData,
  });
};

// get model data
export const getModelData = (formData) => async (dispatch) => {
  console.log("model");
  // insert the form into a new variable
  const postInput = formData;
  // insert the user ID in the form data
  try {
    const res = await api.post("/input", postInput);
    dispatch({
      type: MODEL_DATA,
      payload: res.data.currentModel,
    });
    dispatch({
      type: MODEL_TOGGLE,
      payload: true,
    });
  } catch (err) {
    // token non-valide, ouvre auth modal ferme save et account
    if ((err.response.data.msg = "token")) {
      dispatch(accountModalToggle(false));
      dispatch(saveModalToggle(false));
      dispatch(authToggle(true));
      dispatch({ type: AUTH_ERROR });
      dispatch({ type: REMOVE_USER_PARAMS });
    } else {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

export const createProject = (formData) => async (dispatch) => {
  console.log("create");
  // insert the form into a new variable
  const postInput = formData;
  // insert the user ID in the form data
  try {
    // console.log("create", postInput);
    const res = await api.post("/create", postInput);
    dispatch({
      type: NEW_PROJECT,
      payload: res.data.newProjectList,
    });
  } catch (err) {
    console.log(err);
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

export const createFirstProject = (formData, id) => async (dispatch) => {
  console.log("create");
  // insert the form into a new variable
  const postInput = formData;
  // insert the user ID in the form data
  postInput.user = id;
  try {
    // console.log("create", postInput);
    const res = await api.post("/create/first", postInput);
    console.log(res.data);
  } catch (err) {
    console.log(err);
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

export const updateProject = (formData) => async (dispatch) => {
  console.log("update");
  // insert the form into a new variable
  const postInput = formData;
  // insert the user ID in the form data
  try {
    // console.log("update", postInput);
    const res = await api.post("/update", postInput);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data.newProjectList,
    });
    dispatch(setAlert(res.msg, res.color, 3000));
  } catch (err) {
    // token non-valide, ouvre auth modal ferme save et account
    if ((err.response.data.msg = "token")) {
      dispatch(accountModalToggle(false));
      dispatch(saveModalToggle(false));
      dispatch(authToggle(true));
      dispatch({ type: AUTH_ERROR });
      dispatch({ type: REMOVE_USER_PARAMS });
    } else {
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
    // token non-valide, ouvre auth modal ferme save et account
    if ((err.response.data.msg = "token")) {
      dispatch(accountModalToggle(false));
      dispatch(saveModalToggle(false));
      dispatch(authToggle(true));
      dispatch({ type: AUTH_ERROR });
      dispatch({ type: REMOVE_USER_PARAMS });
    } else {
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

export const removeUserParams = () => async (dispatch) => {
  dispatch({
    type: REMOVE_USER_PARAMS,
  });
};
