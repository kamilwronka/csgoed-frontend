import { combineReducers } from "redux";

import paymentsReducer from "./payments.reducer";
import stripePaymentReducer from "./stripePayment.reducer";

export default combineReducers({
  payments: paymentsReducer,
  stripePayment: stripePaymentReducer
});
