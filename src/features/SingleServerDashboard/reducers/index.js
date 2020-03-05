import { combineReducers } from "redux";
import singleServerReducer from "./singleServer.reducer";

export default combineReducers({
  singleServer: singleServerReducer
});
