// package
import axios from "axios";

// action type
import { FORM_SUBMIT } from "./types";

export const postInputForm = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/input", formData);
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
