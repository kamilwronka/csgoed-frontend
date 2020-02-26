import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./reducers/auth.reducer";
import userReducer from "./reducers/user.reducer";
import serversDashboardReducer from "features/ServersDashboard/reducers/index";
import emailActivationReducer from "./reducers/emailActivation.reducer";
import { activateAccountReducer } from "features/AccountActivationPage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["data", "intact"]
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["data", "intact"]
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, userReducer),
  serversDashboard: serversDashboardReducer,
  emailActivation: emailActivationReducer,
  accountActivation: activateAccountReducer
});
