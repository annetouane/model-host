// package
import jwt from "jwt-decode";

// components
import api from "../utilities/api";
import { setAlert } from "./alert";
import { postInputForm } from "./formData";
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
    console.log(res.data);
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
  }
};

// Register User
export const register = (
  registerData,
  formData,
  detectSave,
  detectModel
) => async (dispatch) => {
  try {
    // get the server's response
    const res = await api.post("/signup", registerData);

    // if the is a success -> dispatch REGISTER_SUCCESS
    // attach the response to the playload
    dispatch({
      type: REGISTER_SUCCESS,
    });

    // send alert check email
    dispatch(setAlert(res.data.alert.msg, res.data.alert.color, 5000));

    // 3 scénarios post-login réussi
    if (detectModel) {
      // if fiscalité -> post input
      dispatch(postInputForm(formData, res.data.id));
    } else {
      // si save -> save modal ou autre
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(); // why +1 ?
      formData.nomProjet = `Projet 1 - ${date}`;
      dispatch(postInputForm(formData, res.data.id));
    }
  } catch (err) {
    console.log(err.response.data.msg);
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color, 5000));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// // Register User modal landing
// export const registerLanding = (registerData) => async (dispatch) => {
//   try {
//     // get the server's response
//     const res = await api.post("/signup", registerData);

//     // if the is a success -> dispatch REGISTER_SUCCESS
//     // attach the response to the playload
//     dispatch({
//       type: REGISTER_SUCCESS,
//     });

//     // send alert check email
//     dispatch(setAlert(res.data.alert.msg, res.data.alert.color, 5000));
//   } catch (err) {
//     console.log(err.response.data.msg);
//     if (err.response.data.msg) {
//       dispatch(setAlert(err.response.data.msg, err.response.data.color, 5000));
//     }
//     dispatch({
//       type: REGISTER_FAIL,
//     });
//   }
// };

// Login User + save inputs lorsque clic sur fiscalité et renvoi modal dataviz
export const login = (loginData, formData, detectSave, detectModel) => async (
  dispatch
) => {
  try {
    // sends back the user
    const res = await api.post("/signin", loginData);

    // decode le token
    const decodedToken = jwt(res.data.token);

    // insert the token in the payload
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // load user
    dispatch(loadUser());

    // 3 scénarios post-login réussi
    if (detectModel) {
      // if fiscalité -> post input
      dispatch(postInputForm(formData, decodedToken.user.id));
      dispatch(modelModalToggle(true));
    } else if (detectSave) {
      // si save -> save modal
      dispatch(saveModalToggle(true));
    } else {
      console.log("nomal"); // sinon ferme la modal (dans la fonction)
    }
    dispatch({
      type: AUTH_TOGGLE,
      payload: false,
    });
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Login User + save inputs lorsque clic sur fiscalité et renvoi modal dataviz
export const loginLanding = (loginData) => async (dispatch) => {
  try {
    // sends back the user
    const res = await api.post("/signin", loginData);

    // insert the token in the payload
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // load user
    dispatch(loadUser());

    // form la fenêtre d'auth
    dispatch({
      type: AUTH_TOGGLE,
      payload: false,
    });
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Mot de passe oublié : envoi email
export const forgotten = (email) => async (dispatch) => {
  const body = { email };

  try {
    // get the server's response
    await api.post("/forgotten", body);
    // if the is a success -> dispatch REGISTER_SUCCESS
    // attach the response to the playload
    dispatch(
      setAlert(
        `A link to reset your password has been sent to : ${email}`,
        "success",
        5000
      )
    );
  } catch (err) {
    console.log("error", err);
    // display the errors (the array of errors called "errors")
    const errors = err.response.data.errors;

    if (errors) {
      // if there are any error : for each error dispatch the set alert with the error message
      // the array of errors generated by the server
      errors.forEach((error) => dispatch(setAlert(error.msg, "red")));
    }
  }
};

// Mot de passe oublié : update mot de passe
export const updPassword = (formData) => async (dispatch) => {
  try {
    // get the server's response
    const res = await api.post("/change-pwd", formData);
    console.log(res.data.msg);
    // dispatch(setAlert(res.data.msg, res.data.color, 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Delete account
export const deleteAccount = () => async (dispatch) => {
  console.log("delete");
  try {
    await api.delete("/delete-user");
    dispatch({ type: LOGOUT });
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};
