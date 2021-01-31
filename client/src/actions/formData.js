// action type
import {
  MODEL_DATA,
  STORE_PARAMS,
  DELETE_PROJECT,
  NEW_PROJECT,
  UPDATE_PROJECT,
  MODEL_TOGGLE,
  AUTH_ERROR,
  REMOVE_USER_PARAMS,
} from "./types";
import { setAlert, setAlertStrip } from "./alert";
import {
  authToggle,
  accountModalToggle,
  saveModalToggle,
  modelModalToggle,
  // modelModalClic,
  saveModalClic,
} from "./modals";
import setAuthToken from "../utilities/setAuthToken";

// utilities
import api from "../utilities/api";

export const storeParams = (formData) => (dispatch) => {
  dispatch({
    type: STORE_PARAMS,
    payload: formData,
  });
};

// get model data
export const getModelData = (formData) => async (dispatch) => {
  console.log("model");
  if (localStorage.token) {
    // if there is a token in local storage,
    // sends the token in global header by calling the function setAuthToken
    setAuthToken(localStorage.token);
  }
  // insert the form into a new variable
  const postInput = formData;
  // insert the user ID in the form data
  try {
    const res = await api.post("/input", postInput);
    dispatch({
      type: MODEL_DATA,
      payload: res.data.currentModel,
    });
    dispatch({
      type: MODEL_TOGGLE,
      payload: true,
    });
    // !!!!!!!!!!! modelModalClic(true); // detect clic sur model !!!!!!!!!!!
    modelModalToggle(true); // ouvre modal model
  } catch (err) {
    // token non-valide, ouvre auth modal ferme save et account
    if (err.response.data.msg === "token") {
      dispatch(modelModalToggle(false)); // ferme fenetre model
      dispatch(authToggle(true)); // ouvre auth modal
      dispatch({ type: AUTH_ERROR }); // efface user information
      dispatch({ type: REMOVE_USER_PARAMS }); // efface project information
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

export const createProject = (formData) => async (dispatch) => {
  console.log("create");
  if (localStorage.token) {
    // if there is a token in local storage,
    // sends the token in global header by calling the function setAuthToken
    setAuthToken(localStorage.token);
  }
  // insert the form into a new variable
  const postInput = formData;
  // insert the user ID in the form data
  try {
    const res = await api.post("/create", postInput);
    // insert project list to reducer
    dispatch({
      type: NEW_PROJECT,
      payload: res.data.newProjectList,
    });
    dispatch(saveModalToggle(false)); // ferme la fenetre de sauvegarde
    dispatch(saveModalClic(false)); // reset clic sur Save a false
    dispatch(setAlertStrip(res.data.msg, res.data.color, "#01c96c", 2000)); // alert création OK
  } catch (err) {
    if (err.response.data.msg !== "Ce nom de projet existe déjà") {
      dispatch(saveModalToggle(false)); // ferme la fenetre de sauvegarde
      dispatch(authToggle(true)); // ouvre auth modal
      dispatch({ type: AUTH_ERROR }); // efface user information
      dispatch({ type: REMOVE_USER_PARAMS }); // efface project information
      dispatch(
        setAlertStrip(
          "Merci de vous identifier de nouveau pour effectuer cette opération",
          "red",
          "red",
          3000
        )
      );
    } else {
      dispatch(setAlert(err.response.data.msg, err.response.data.color, 3000));
    }
  }
};

// update project
export const updateProject = (formData) => async (dispatch) => {
  console.log("create");
  if (localStorage.token) {
    // if there is a token in local storage,
    // sends the token in global header by calling the function setAuthToken
    setAuthToken(localStorage.token);
  }
  console.log("update");
  // insert the form into a new variable
  const postInput = formData;
  // insert the user ID in the form data
  try {
    // console.log("update", postInput);
    const res = await api.post("/update", postInput);
    console.log(res.data);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data.newProjectList,
    });
    dispatch(saveModalToggle(false)); // ferme fenetre save
    dispatch(saveModalClic(false)); // reset detection clic save
    dispatch(setAlertStrip(res.data.msg, res.data.color, "#01c96c", 2000)); // update ok
  } catch (err) {
    // token non-valide, ouvre auth modal ferme save et account
    if (err.response.data.msg === "token") {
      dispatch(saveModalToggle(false)); // ferme fenetre modal
      dispatch(authToggle(true)); // ouvre auth modal
      dispatch({ type: AUTH_ERROR }); // efface user information
      dispatch({ type: REMOVE_USER_PARAMS }); // efface project information
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

export const deleteProject = (id) => async (dispatch) => {
  if (localStorage.token) {
    // if there is a token in local storage,
    // sends the token in global header by calling the function setAuthToken
    setAuthToken(localStorage.token);
  }
  try {
    const res = await api.delete(`/input/${id}`);
    console.log("delete", res.data);
    // delete projet de list dans reducer
    dispatch({
      type: DELETE_PROJECT,
      payload: { idProjet: res.data },
    });
  } catch (err) {
    // token non-valide, ouvre auth modal ferme save et account
    if (err.response.data.msg === "token") {
      dispatch(accountModalToggle(false)); // ferme modal mon compte
      dispatch(authToggle(true)); // ouvre auth modal
      dispatch({ type: AUTH_ERROR }); // efface user information
      dispatch({ type: REMOVE_USER_PARAMS }); // efface project information
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

export const postEmail = (email) => async (dispatch) => {
  console.log("mail", email);
  try {
    if (process.env.NODE_ENV === "production") {
      await api.post("/user-email", { email: email });
      // setAlert({ msg: res.data });
      console.log("heroku");
    } else {
      await api.post("/user-email", { email: email });
      // setAlert({ msg: res.data });
      console.log("local");
    }
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, err.response.data.color));
    }
  }
};

export const saveToReducer = (formData) => async (dispatch) => {
  dispatch({
    type: NEW_PROJECT,
    payload: { idProjet: formData },
  });
};

export const updateToReducer = (formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROJECT,
    payload: { idProjet: formData },
  });
};

export const removeUserParams = () => async (dispatch) => {
  dispatch({
    type: REMOVE_USER_PARAMS,
  });
};

// check if token is valid when visualizing new project
// export const visualiseProject = () => async (dispatch) => {
//   console.log("visualiseProject");
//   if (localStorage.token) {
//     // if there is a token in local storage,
//     // sends the token in global header by calling the function setAuthToken
//     setAuthToken(localStorage.token);
//   }
//   try {
//     const res = await api.get("/");
//     dispatch({
//       type: USER_LOADED,
//       payload: res.data.user,
//     });
//   } catch (err) {
//     if ((err.response.data.msg === "token")) {
//       dispatch(accountModalToggle(false));
//       dispatch(authToggle(true));
//       dispatch({ type: AUTH_ERROR });
//       dispatch({ type: REMOVE_USER_PARAMS });
//     } else {
//       dispatch(setAlert(err.response.data.msg, err.response.data.color));
//     }
//   }
// };

// export const createFirstProject = (formData, id) => async (dispatch) => {
//   console.log("create");
//   // insert the form into a new variable
//   const postInput = formData;
//   // insert the user ID in the form data
//   postInput.user = id;
//   try {
//     // console.log("create", postInput);
//     const res = await api.post("/create/first", postInput);
//     console.log(res.data);
//   } catch (err) {
//     console.log(err);
//     if (err.response.data.msg) {
//       dispatch(setAlert(err.response.data.msg, err.response.data.color));
//     }
//   }
// };
