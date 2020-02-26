import { ApiService } from "services";

export const ACTIONS = {
  SIGN_IN_USER: "SIGN_IN_USER",
  SIGN_UP_USER: "SIGN_UP_USER",
  LOG_OUT_USER: "LOG_OUT_USER",
  CLEAR_ERROR: "AUTH_CLEAR_ERROR",
  SEND_ACTIVATION_EMAIL: "SEND_ACTIVATION_EMAIL"
};

export const signInUser = ({ email, password }) => dispatch => {
  return dispatch(
    ApiService(ACTIONS.SIGN_IN_USER, {
      url: "/signin",
      method: "post",
      data: {
        email,
        password
      },
      needsAuth: false
    })
  );
};

export const signUpUser = ({ name, email, password }) => dispatch => {
  return dispatch(
    ApiService(ACTIONS.SIGN_UP_USER, {
      url: "/signup",
      method: "post",
      data: {
        email,
        name,
        password
      }
    })
  );
};

export const sendActivationEmail = () => dispatch => {
  dispatch({ type: `${ACTIONS.SEND_ACTIVATION_EMAIL}_RESET` });

  return dispatch(
    ApiService(ACTIONS.SEND_ACTIVATION_EMAIL, {
      url: "/activate-email",
      method: "post",
      needsAuth: true
    })
  );
};

export const logOutUser = () => {
  return {
    type: ACTIONS.LOG_OUT_USER
  };
};

export const clearError = () => {
  return {
    type: ACTIONS.CLEAR_ERROR
  };
};
