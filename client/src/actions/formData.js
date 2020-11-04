// package
import axios from "axios";

// action type
import { FORM_SUBMIT } from "./types";

export const postInputForm = (formData) => async (dispatch) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const res = await axios.post(
        "https://stark-tundra-51067.herokuapp.com/input",
        formData
      );
      // setAlert({ msg: res.data });
      console.log("heroku");
      dispatch({
        type: FORM_SUBMIT,
        payload: res.data,
      });
    } else {
      const res = await axios.post("http://localhost:5000/input", formData);
      // setAlert({ msg: res.data });
      console.log("local");
      dispatch({
        type: FORM_SUBMIT,
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
      const res = await axios.post(
        "https://stark-tundra-51067.herokuapp.com/email",
        { email: email }
      );
      // setAlert({ msg: res.data });
      console.log("heroku");
    } else {
      const res = await axios.post("http://localhost:5000/email", { email: email });
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
