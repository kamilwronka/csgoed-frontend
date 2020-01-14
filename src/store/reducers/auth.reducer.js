import createReducer from "store/reducer.factory";
import { ACTIONS } from "features/AuthPage/actions/auth.actions";

const additionalCases = {};

additionalCases[ACTIONS.LOG_OUT_USER] = state => {
  return state;
};

export default createReducer(ACTIONS.SIGN_IN_USER, {
  additionalCases
});
