import { v4 as uuidv4 } from "uuid";
import {
  SET_ALERT,
  REMOVE_ALERT,
  SET_ALERT_STRIP,
  REMOVE_ALERT_STRIP,
} from "./types";

export const setAlert = (msg, alertType, timeout = 3000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const setAlertStrip = (msg, alertType, color, timeout = 5000) => (
  dispatch
) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT_STRIP,
    payload: { msg, alertType, color, id },
  });
  setTimeout(
    () => dispatch({ type: REMOVE_ALERT_STRIP, payload: id }),
    timeout
  );
};

export const removeAlertStrip = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT_STRIP, payload: id });
};
