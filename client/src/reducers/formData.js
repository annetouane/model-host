import { FORM_SUBMIT } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FORM_SUBMIT:
      return [...state, payload];

    default:
      return state;
  }
}
