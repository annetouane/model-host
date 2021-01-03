import { MODEL_DATA, STORE_PARAMS, PROJECT_LIST } from "../actions/types";

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
    default:
      return state;
  }
}
