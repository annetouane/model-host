// package
import jwt from "jwt-decode";

// components
import api from "../utilities/api";
import { setAlert, setAlertStrip } from "./alert";
import { getModelData } from "./formData";
import {
  mobileVerificationToggle,
  forgottenPasswordToggle,
  authToggle,
  landingToggle,
  accountModalToggle,
} from "./modals";
import setAuthToken from "../utilities/setAuthToken";

// actions
import { modelModalToggle, saveModalToggle } from "../actions/modals";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_TOGGLE,
  PROJECT_LIST,
  REMOVE_USER_PARAMS,
  RECOVER_PASSWORD,
  LOADING,
  LOADED,
} from "./types";

// load the user each time the main app is updated to check authentication
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    // if there is a token in local storage,
    // sends the token in global header by calling the function setAuthToken
    setAuthToken(localStorage.token);
  }
  try {
    const res = await api.get("/");
    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    });

    // insert project list in the payload
    dispatch({
      type: PROJECT_LIST,
      payload: res.data.projects,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch({ type: REMOVE_USER_PARAMS });
  }
};

export const authError = () => async (dispatch) => {
  dispatch({
    type: AUTH_ERROR,
  });
};

// check if user is registrable
export const registerCheck = (registerData) => async (dispatch) => {
  if (registerData.passwordSignUp !== registerData.confirmPassword) {
    dispatch(setAlert("Les mots de passe ne correspondent pas", "red", 3000));
  } else {
    try {
      // get the server's response
      const res = await api.post("/signup/check", registerData);
      if (res.data.msg === "ok") {
        dispatch(mobileVerificationToggle(true));
      }
    } catch (err) {
      console.log(err.response.data.msg);
      if (err.response.data.msg) {
        dispatch(
          setAlert(err.response.data.msg, err.response.data.color, 3000)
        );
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  }
};

// Register User
export const register = (registerData, formData) => async (dispatch) => {
  console.log(registerData, formData);
  try {
    // get the server's response
    const res = await api.post("/signup", registerData);

    // insert the token in the payload
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // ferme la fenetre de vérification mobile
    dispatch(mobileVerificationToggle(false));
    // ferme la landing page
    dispatch(landingToggle(false));
    // ferme la fenetre d'auth
    dispatch(authToggle(false));
    // bandeau de bienvenu
    dispatch(
      setAlertStrip(
        "Bienvenue dans votre compte. Vous pouvez désormais visualiser le cash-flow après impôts de vos projets et les sauvegarder",
        "green",
        "#01c96c",
        10000
      )
    );
    // load user
    dispatch(loadUser());
    // end
  } catch (err) {
    console.log(err.response.data.msg);
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color, 3000));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User + save inputs lorsque clic sur fiscalité et renvoi modal dataviz
export const login = (loginData, formData, detectSave, detectModel) => async (
  dispatch
) => {
  try {
    // sends back the user
    const res = await api.post("/signin", loginData);

    // open spinner page
    dispatch({
      type: LOADING,
    });

    // decode le token
    const decodedToken = jwt(res.data.token);

    // insert the token in the payload
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: AUTH_TOGGLE,
      payload: false,
    });

    // load user
    dispatch(loadUser());

    setTimeout(function () {
      // ferme la landing page
      dispatch(landingToggle(false));
      // close spinner page
      dispatch({
        type: LOADED,
      });
      // 2 scénarios post-login réussi
      if (detectModel) {
        // if fiscalité -> post input
        dispatch(getModelData(formData, decodedToken.user.id));
        dispatch(modelModalToggle(true));
      }
      if (detectSave) {
        // si save -> save modal
        dispatch(saveModalToggle(true));
      }
    }, 1500);
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Mot de passe oublié : update mot de passe
export const updPassword = (passwords) => async (dispatch) => {
  if (localStorage.token) {
    // if there is a token in local storage,
    // sends the token in global header by calling the function setAuthToken
    setAuthToken(localStorage.token);
  }
  try {
    // get the server's response
    const res = await api.post("/change-pwd", passwords);
    console.log(res.data.msg);
    dispatch(setAlertStrip(res.data.msg, "green", "#01c96c", 3000));
    dispatch(accountModalToggle(false));
  } catch (err) {
    console.log(err.response.data.msg);
    if (err.response.data.msg === "token") {
      dispatch(accountModalToggle(false));
      dispatch(authToggle(true));
      dispatch({ type: AUTH_ERROR });
      dispatch({ type: REMOVE_USER_PARAMS });
      dispatch(
        setAlertStrip(
          "Merci de vous identifier de nouveau pour effectuer cette opération",
          "red",
          "red",
          3000
        )
      );
    } else {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

// Delete account
export const deleteAccount = () => async (dispatch) => {
  console.log("delete");
  if (localStorage.token) {
    // if there is a token in local storage,
    // sends the token in global header by calling the function setAuthToken
    setAuthToken(localStorage.token);
  }
  try {
    await api.delete("/delete-user");
    dispatch({ type: LOGOUT });
    dispatch(accountModalToggle(false));
    dispatch(landingToggle(true));
    dispatch(
      setAlertStrip("Votre compte a été supprimé", "green", "#01c96c", 3000)
    );
  } catch (err) {
    console.log(err.response.data.msg);
    if (err.response.data.msg === "token") {
      dispatch(accountModalToggle(false));
      dispatch(authToggle(true));
      dispatch({ type: AUTH_ERROR });
      dispatch({ type: REMOVE_USER_PARAMS });
      dispatch(
        setAlertStrip(
          "Merci de vous identifier de nouveau pour effectuer cette opération",
          "red",
          "red",
          3000
        )
      );
    } else {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: REMOVE_USER_PARAMS });
};

// Mot de passe oublié : envoi sms
export const forgottenSms = (mobile) => async (dispatch) => {
  console.log(mobile);
  const userMobile = { mobile: mobile };
  console.log(userMobile);
  try {
    // get the server's response
    const res = await api.post("/forgotten-pwd", userMobile);
    console.log(res.data);
    // insert ID et n° de mobile dans le redcuer
    dispatch({ type: RECOVER_PASSWORD, payload: res.data });
    dispatch(forgottenPasswordToggle(true));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

export const forgottenChange = (data) => async (dispatch) => {
  try {
    // get the server's response
    const res = await api.post("/forgotten-pwd/reset", data);
    dispatch(setAlertStrip(res.data.msg, res.data.color, "#01c96c"));
  } catch (err) {
    console.log("forgottenChange", err.response.data.msg);
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

// Mot de passe oublié : envoi email
// export const forgottenEmail = (email) => async (dispatch) => {
//   console.log(email);
//   const userEmail = { email: email };
//   console.log(userEmail);
//   try {
//     // get the server's response
//     const res = await api.post("/forgotten-pwd", userEmail);
//     console.log(res.data);
//     dispatch(setAlert(res.data.msg, res.data.color, 5000));
//   } catch (err) {
//     if (err.response.data.msg) {
//       dispatch(setAlert(err.response.data.msg, err.response.data.color));
//     }
//   }
// };

// // Mot de passe oublié : changement mot de passe
// export const forgottenChangeEmail = (newPassword, id) => async (dispatch) => {
//   const body = { newPassword };
//   try {
//     // get the server's response
//     const res = await api.post(`/forgotten-pwd/${id}`, body);
//     dispatch(setAlert(res.data.msg, res.data.color));
//     // console.log(res.data);
//   } catch (err) {
//     if (err.response.data.msg) {
//       dispatch(setAlert(err.response.data.msg, err.response.data.color));
//     }
//   }
// };
