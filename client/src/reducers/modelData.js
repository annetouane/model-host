import { MODEL_DATA } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MODEL_DATA:
      return [...state, payload];

    default:
      return state;
  }
}
