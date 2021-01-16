// actions
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
} from "./types";

// Open Auth Window
export const authToggle = (bool) => (dispatch) => {
  dispatch({
    type: AUTH_TOGGLE,
    payload: bool,
  });
};

// Landing / form Window
export const landingToggle = (bool) => (dispatch) => {
  dispatch({
    type: LANDING_TOGGLE,
    payload: bool,
  });
};

// detect clic sur le bouton save
export const saveModalClic = (bool) => (dispatch) => {
  dispatch({ type: DETECT_SAVE, payload: bool });
};

// ouvre la modal save
export const saveModalToggle = (bool) => (dispatch) => {
  dispatch({
    type: SAVE_TOGGLE,
    payload: bool,
  });
};

// detect clic sur bouton modélisation
export const modelModalClic = (bool) => (dispatch) => {
  dispatch({
    type: DETECT_MODEL,
    payload: bool,
  });
};

// ouvre la modal modélisation
export const modelModalToggle = (bool) => (dispatch) => {
  dispatch({
    type: MODEL_TOGGLE,
    payload: bool,
  });
};

// ouvre la modal mon compte
export const accountModalToggle = (bool) => (dispatch) => {
  dispatch({
    type: ACCOUNT_TOGGLE,
    payload: bool,
  });
};

// ouvre le menu mobile
export const mobileMenuToggle = (bool) => (dispatch) => {
  dispatch({
    type: MOBILE_MENU_TOGGLE,
    payload: bool,
  });
};

// ouvre les kpi sur mobile
export const kpiMobileToggle = (bool) => (dispatch) => {
  dispatch({
    type: KPI_MOBILE_TOGGLE,
    payload: bool,
  });
};

// ouvre vérification mobile
export const mobileVerificationToggle = (bool) => (dispatch) => {
  dispatch({
    type: MOBILE_VERIF_TOGGLE,
    payload: bool,
  });
};

// detect si url pwd-change ou racine
export const passwordChangePage = (bool) => (dispatch) => {
  dispatch({
    type: PWD_CHANGE_PAGE,
    payload: bool,
  });
};
