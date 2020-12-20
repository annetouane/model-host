import { MODEL_DATA, STORE_PARAMS } from "../actions/types";

const initialState = {
  currentParams: [],
  currentModel: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STORE_PARAMS:
      return {
        ...state,
        currentParams: payload,
      }
    case MODEL_DATA:
      return {
        ...state,
        currentModel: payload,
      }
    default:
      return state;
  }
}
