import {
  MODEL_DATA,
  STORE_PARAMS,
  PROJECT_LIST,
  NEW_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  REMOVE_USER_PARAMS,
} from "../actions/types";

const initialState = {
  currentParams: [],
  currentModel: [],
  projects: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STORE_PARAMS:
      return {
        ...state,
        currentParams: payload,
      };
    case MODEL_DATA:
      return {
        ...state,
        currentModel: payload,
      };
    case PROJECT_LIST:
      return {
        ...state,
        projects: payload,
      };
    case NEW_PROJECT:
      return {
        ...state,
        projects: payload,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: payload,
      };
    case DELETE_PROJECT:
      console.log(payload);
      return {
        ...state,
        projects: [
          ...state.projects.filter(
            (project) => project._id !== payload.idProjet
          ),
        ], // retire le projet supprimé selon son ID
      };
    case REMOVE_USER_PARAMS:
      // retire toutes les données utilisateurs
      return {
        ...state,
        currentParams: [],
        currentModel: [],
        projects: [],
      };
    default:
      return state;
  }
}
