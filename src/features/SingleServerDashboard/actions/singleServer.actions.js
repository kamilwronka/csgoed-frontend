import { ApiService } from "services";

export const ACTIONS = {
  FETCH_SERVER_DATA: "FETCH_SERVER_DATA"
};

export const fetchServerData = id => dispatch => {
  return dispatch(
    ApiService(ACTIONS.FETCH_SERVER_DATA, {
      url: `/servers/${id}`,
      method: "get",
      needsAuth: true
    })
  );
};
