import { combineReducers } from "redux";
import alert from "./alert";
import modelData from "./modelData";

// root reducer
// include any created reducer
export default combineReducers({
  alert,
  modelData,
});
