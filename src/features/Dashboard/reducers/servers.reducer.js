import createReducer from "store/reducer.factory";
import { ACTIONS } from "../actions/servers.actions";

export default createReducer(ACTIONS.FETCH_SERVERS);
