import createReducer, { BASE_INITIAL_STATE } from "store/reducer.factory";
import { REQUEST_STATES } from "middleware/promiseMiddleware";

import { ACTIONS } from "features/AuthPage/actions/auth.actions";

const additionalCases = {};

additionalCases[ACTIONS.LOG_OUT_USER] = state => {
  return BASE_INITIAL_STATE;
};

additionalCases[`${ACTIONS.SIGN_UP_USER}_${REQUEST_STATES.PENDING}`] = (
  state,
  action
) => {
  return { ...state, fetching: true, intact: false };
};

additionalCases[`${ACTIONS.SIGN_UP_USER}_${REQUEST_STATES.RESOLVED}`] = (
  state,
  action
) => {
  return { ...state, data: action.payload, fetching: false };
};

additionalCases[`${ACTIONS.SIGN_UP_USER}_${REQUEST_STATES.REJECTED}`] = (
  state,
  action
) => {
  return { ...state, error: action.payload, fetching: false };
};

additionalCases[ACTIONS.CLEAR_ERROR] = state => {
  return { ...state, error: null };
};

export default createReducer(ACTIONS.SIGN_IN_USER, {
  additionalCases
});
