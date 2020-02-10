import { combineReducers } from "redux";

import serverReducer from "./servers.reducer";
import availableGamesReducer from "./availableGames.reducer";
import createNewServerReducer from "./newServer.reducer";

export default combineReducers({
  servers: serverReducer,
  availableGames: availableGamesReducer,
  createNewServer: createNewServerReducer
});
