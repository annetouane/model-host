import {
  AUTH_TOGGLE,
  DETECT_SAVE,
  SAVE_TOGGLE,
  DETECT_MODEL,
  MODEL_TOGGLE,
  ACCOUNT_TOGGLE,
  LANDING_TOGGLE,
  MOBILE_MENU_TOGGLE,
  KPI_MOBILE_TOGGLE,
  PWD_CHANGE_PAGE,
  MOBILE_VERIF_TOGGLE,
} from "../actions/types";

// init state : token stored in localStorage : look for an item called token
const initialState = {
  authModal: false,
  saveModal: false,
  modelModal: false,
  accountModal: false,
  landingModal: true,
  mobileMenu: false,
  kpiMobile: false,
  detectSave: false,
  detectModel: false,
};

export default function (state = initialState, action) {
  // destructure action
  const { type, payload } = action;

  switch (type) {
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
    // mobile menu
    case MOBILE_MENU_TOGGLE:
      return {
        ...state,
        mobileMenu: payload,
      };
    // kpi mobile
    case KPI_MOBILE_TOGGLE:
      return {
        ...state,
        kpiMobile: payload,
      };
    // kpi mobile
    case PWD_CHANGE_PAGE:
      return {
        ...state,
        passwordChange: payload,
      };
    // kpi mobile
    case MOBILE_VERIF_TOGGLE:
      return {
        ...state,
        modalMobileVerif: payload,
      };
    default:
      return state;
  }
}
