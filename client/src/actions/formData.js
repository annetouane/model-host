// package
import axios from "axios";

// action type
import { FORM_SUBMIT } from "./types";

export const postInputForm = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://stark-tundra-51067.herokuapp.com/input",
      formData
    );
    console.log(res.data);
    dispatch({
      type: FORM_SUBMIT,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      console.log(error);
      // dispatch(setAlert(error, "red"));
    }
  }
};

export const postEmail = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://stark-tundra-51067.herokuapp.com/email",
      formData
    );
    console.log("res", res.data);
    // dispatch({
    //   type: EMAIL_SUBMIT,
    //   payload: res.data,
    // });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      console.log(error);
      // dispatch(setAlert(error, "red"));
    }
  }
};
