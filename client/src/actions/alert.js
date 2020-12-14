import { v4 as uuidv4 } from "uuid";
// call the different cases in the reducer through dispatch
import { SET_ALERT, REMOVE_ALERT } from "./types";

// called from the component, this action will trigger the reducer
// (dispatch) allows to dispatch several action types in the same function
// (dispatch) is part of the thunk middleware
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  // pass an object with TYPE
  // payload : msg to display, alert type (to set color) and alert id
  dispatch({
    type: SET_ALERT,
    // msg and alert type from the function, id generated with uuid
    payload: { msg, alertType, id },
  });
  // after x seconds, passes an objet to remove alert
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
