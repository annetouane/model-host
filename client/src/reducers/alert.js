// centralized action types
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// init app level state
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [payload];
      case REMOVE_ALERT:
      // remove an alert by filtering it out of the state with the ID
      // return the state (the array) and filter through it and removes the alert holding the payload's ID
      // return all alert expect the one matching the payload
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
