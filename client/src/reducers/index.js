import { combineReducers } from "redux";
import alert from "./alert";
import alertStrip from "./alertStrip";
import auth from "./auth";
import modelData from "./modelData";
import modals from "./modals";

// root reducer
// include any created reducer
export default combineReducers({
  alert,
  auth,
  modelData,
  modals,
  alertStrip,
});
