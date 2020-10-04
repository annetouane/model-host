import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// initialize empty state
const initialState = {};

// middleware
const middleware = [thunk];

// create the store (app level state)
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // alows to use the redux devtools
);

export default store;
