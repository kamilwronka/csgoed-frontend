import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./reducers/auth.reducer";
import serversDashboardReducer from "features/ServersDashboard/reducers/index";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["data"]
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  serversDashboard: serversDashboardReducer
});
