import createReducer from "store/reducer.factory";
import { ACTIONS } from "../actions/payment.actions";

export default createReducer(ACTIONS.STRIPE_PAYMENT);
