import { combineReducers } from "redux";
import alert from "./alert";
import formData from "./formData";

// root reducer
// include any created reducer
export default combineReducers({
  alert,
  formData,
});
