import createReducer from "store/reducer.factory";
import { ACTIONS } from "../actions/singleServer.actions";

export default createReducer(ACTIONS.FETCH_SERVER_DATA);
