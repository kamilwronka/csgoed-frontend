import { ApiService } from "services";

export const ACTIONS = {
  STRIPE_PAYMENT: "STRIPE_PAYMENT",
  FETCH_USER_PAYMENTS: "FETCH_USER_PAYMENTS"
};

export const handleStripePayment = (data, amount) => dispatch => {
  return dispatch(
    ApiService(ACTIONS.STRIPE_PAYMENT, {
      url: "/payments/stripe",
      method: "post",
      data: {
        data,
        amount
      },
      needsAuth: true
    })
  );
};

export const fetchUserPayments = () => dispatch => {
  return dispatch(
    ApiService(ACTIONS.FETCH_USER_PAYMENTS, {
      method: "get",
      url: "/user/payments",
      needsAuth: true
    })
  );
};
