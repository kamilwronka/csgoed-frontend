import { ApiService } from "services";

export const ACTIONS = {
  SIGN_IN_USER: "SIGN_IN_USER",
  LOG_OUT_USER: "LOG_OUT_USER"
};

export const signInUser = ({ email, password }) => dispatch => {
  return dispatch(
    ApiService(ACTIONS.SIGN_IN_USER, {
      url: "/signin",
      method: "post",
      data: {
        email: email,
        password
      },
      needsAuth: false
    })
  );
};

export const logOutUser = () => {
  return {
    type: ACTIONS.LOG_OUT_USER
  };
};
