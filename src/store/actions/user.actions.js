import { ApiService } from "services";

export const ACTIONS = {
  FETCH_USER_DATA: "FETCH_USER_DATA"
};

export const fetchUserData = () => dispatch => {
  return dispatch(
    ApiService(ACTIONS.FETCH_USER_DATA, {
      url: "/user",
      method: "get",
      needsAuth: true
    })
  );
};
