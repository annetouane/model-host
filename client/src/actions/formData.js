// package
import axios from "axios";

// action type
import { MODEL_DATA, STORE_PARAMS } from "./types";

export const storeParams = (formData) => (dispatch) => {
    dispatch({
      type: STORE_PARAMS,
      payload: formData,
    });
  }

export const postInputForm = (formData) => async (dispatch) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const res = await axios.post(
        "https://simulimo.herokuapp.com/input",
        formData
      );
      console.log("heroku");
      dispatch({
        type: MODEL_DATA,
        payload: res.data,
      });
    } else {
      const res = await axios.post("http://localhost:5000/input", formData);
      console.log('model data',res.data)
      console.log("local");
      dispatch({
        type: STORE_PARAMS,
        payload: formData,
      });
      dispatch({
        type: MODEL_DATA,
        payload: res.data,
      });
    }
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      console.log(error);
      // dispatch(setAlert(error, "red"));
    }
  }
};

export const postEmail = (email) => async (dispatch) => {
  console.log("mail", email)
  try {
    if (process.env.NODE_ENV === "production") {
      await axios.post(
        "https://simulimo.herokuapp.com/user-email",
        { email: email }
      );
      // setAlert({ msg: res.data });
      console.log("heroku");
    } else {
      await axios.post("http://localhost:5000/user-email", { email: email });
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
