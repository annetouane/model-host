// centralized action types
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// takes in a piece of state and an action that will be dispatch from an action file

// init app level state
const initialState = [];

//
export default function (state = initialState, action) {
  // destructure the action
  // type will trigger the right case, payload hold alert infos
  const { type, payload } = action;
  // switch statement is used to evaluate the type of action
  // type as argument to trigger the right action
  // switch : evaluate which action
  switch (type) {
    case SET_ALERT:
      // aliment the state with the payload
      // return an array
      // ...state: the state is immutable, keeps what was originally in the state
      // if there was already an alert in there, it will stay and we at our new alert
      // the state will be passed to the alert component
      return [...state, payload];
    // remove an alert by filtering it out of the state with the ID
    case REMOVE_ALERT:
      // return the state (the array) and filter through it and removes the alert holding the payload's ID
      // return all alert expect the one matching the payload
      return state.filter((alert) => alert.id !== payload);
    // defaut case : return the state
    default:
      return state;
  }
}
