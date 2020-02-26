import createReducer from "store/reducer.factory";
import { ACTIONS } from "features/AuthPage/actions/auth.actions";

export default createReducer(ACTIONS.SEND_ACTIVATION_EMAIL);
