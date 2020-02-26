import createReducer, { BASE_INITIAL_STATE } from "store/reducer.factory";
import { ACTIONS as AUTH_ACTIONS } from "features/AuthPage/actions/auth.actions";
import { ACTIONS as USER_ACTIONS } from "../actions/user.actions";

const additionalCases = {};

additionalCases[AUTH_ACTIONS.LOG_OUT_USER] = () => {
  return BASE_INITIAL_STATE;
};

export default createReducer(USER_ACTIONS.FETCH_USER_DATA, {
  additionalCases
});
