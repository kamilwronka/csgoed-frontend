import createReducer from "store/reducer.factory";
import { ACTIONS } from "../actions/payment.actions";

const additionalCases = {};

additionalCases[`${ACTIONS.STRIPE_PAYMENT}_RESOLVED`] = (state, action) => {
  return { ...state, data: { ...state.data, balance: action.payload.balance } };
};

export default createReducer(ACTIONS.FETCH_USER_PAYMENTS, {
  additionalCases
});
