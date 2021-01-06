import {
  MODEL_DATA,
  STORE_PARAMS,
  PROJECT_LIST,
  NEW_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
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
      console.log(payload);
      return {
        ...state,
        projects: [...state.projects.push(payload)], // retire le projet supprimé selon son ID
      };
    case UPDATE_PROJECT:
      console.log(payload);
      return {
        ...state,
        projects: [
          ...state.projects.filter(
            (project) => project._id !== payload.idProjet
          ),
        ], // retire le projet supprimé selon son ID
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
    default:
      return state;
  }
}
