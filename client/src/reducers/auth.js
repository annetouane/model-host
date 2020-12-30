import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    AUTH_TOGGLE,
    DETECT_SAVE,
    SAVE_TOGGLE,
    DETECT_MODEL,
    MODEL_TOGGLE,
    ACCOUNT_TOGGLE,
    LANDING_TOGGLE
  } from "../actions/types";
  
  // init state : token stored in localStorage : look for an item called token
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null, // when successful response from login -> set to true
    loading: true, // set it to false when loaded
    user: null, // insert user id & email
    authModal: false,
    detectSave: false,
    saveModal: false,
    detectModel: false,
    modelModal: false,
    accountModal: false,
    landingModal: true,
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
          ...payload, // adds the token to the reducer
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
          // clears the state !!!!!!!!
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      // AUTH window
      case AUTH_TOGGLE:
        return {
          ...state,
          authModal: payload,
        };
      // landing window
      case LANDING_TOGGLE:
        return {
          ...state,
          landingModal: payload,
        };
      // SAVE window actions
      case DETECT_SAVE:
        return {
          ...state,
          detectSave: payload,
        };
        case SAVE_TOGGLE:
          return {
            ...state,
            saveModal: payload,
          };
      // MODEL window actions
      case DETECT_MODEL:
        return {
          ...state,
          detectModel: payload,
        };
        case MODEL_TOGGLE:
          return {
            ...state,
            modelModal: payload,
          };
      // account modal
      case ACCOUNT_TOGGLE:
        return {
          ...state,
          accountModal: payload,
        };
      default:
        return state;
    }
  }