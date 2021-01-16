import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  // LOADING,
  // LOADED,
} from "../actions/types";

// init state : token stored in localStorage : look for an item called token
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false, // when successful response from login -> set to true
  // loading: true, // set it to false when loaded
  user: null, // insert user id & email
};

export default function (state = initialState, action) {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    // case LOADING:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case LOADED:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true, // user is logged in, the token is valid
        // loading: false,
        user: payload, // the user (email + id)
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        // loading: false,
        user: null,
      };
    case LOGIN_SUCCESS:
      // stores the token in local storage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload, // adds the token to the reducer
        isAuthenticated: true,
        // loading: false,
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        // loading: false,
        user: null,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case REGISTER_FAIL:
      // remove the token from local storage
      localStorage.removeItem("token");
      return {
        // clears the state !!!!!!!!
        ...state,
        token: null,
        isAuthenticated: false,
        // loading: false,
        user: null,
      };
    default:
      return state;
  }
}
