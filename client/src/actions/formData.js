// action type
import { MODEL_DATA, STORE_PARAMS } from "./types";

// utilities
import api from "../utilities/api";

export const storeParams = (formData) => (dispatch) => {
  dispatch({
    type: STORE_PARAMS,
    payload: formData,
  });
};

export const postInputForm = (formData, id) => async (dispatch) => {
  console.log("input");
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
    const error = err.response.data.msg;
    if (error) {
      console.log(error);
      // dispatch(setAlert(error, "red"));
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
    const error = err.response.data.msg;
    if (error) {
      console.log(error);
      // dispatch(setAlert(error, "red"));
    }
  }
};
