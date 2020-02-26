import { ApiService } from "services";

export const ACTIONS = {
  ACTIVATE_ACCOUNT: "ACTIVATE_ACCOUNT"
};

export const activateAccount = token => dispatch => {
  return dispatch(
    ApiService(ACTIONS.ACTIVATE_ACCOUNT, {
      method: "post",
      url: "/activate",
      data: {
        token
      }
    })
  );
};
