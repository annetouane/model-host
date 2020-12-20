import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    OPEN_AUTH,
    CLOSE_AUTH,
  } from "../actions/types";
  
  // init state : token stored in localStorage : look for an item called token
  //
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null, // when we make a successful response from login/register -> set to true
    loading: true, // set it to false when loaded
    user: null, // include some user data from the backend
    landingAuth: false,
  };
  
  export default function (state = initialState, action) {
    // destructure action
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true, // user is logged in, the token is valid
          loading: false,
          user: payload, // the user (email + token)
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      case LOGIN_SUCCESS:
        // stores the token in local storage
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload, // adds the user to the reducer
          isAuthenticated: true,
          loading: false,
        };
      case ACCOUNT_DELETED:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
      case REGISTER_FAIL:
        // remove the token from local storage
        localStorage.removeItem("token");
        return {
          // clears the state
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      case OPEN_AUTH:
        return {
          ...state,
          landingAuth: true,
        };
      case CLOSE_AUTH:
        return {
          ...state,
          landingAuth: false,
        };
      default:
        return state;
    }
  }
  