import { ApiService } from "services";

export const ACTIONS = {
  FETCH_SERVERS: "FETCH_SERVERS",
  FETCH_AVAILABLE_GAMES: "FETCH_AVAILABLE_GAMES",
  CREATE_NEW_SERVER: "CREATE_NEW_SERVER",
  CREATE_NEW_SERVER_RESET: "CREATE_NEW_SERVER_RESET",
  DELETE_SERVER: "DELETE_SERVER",
  SET_SERVER_FETCHING: "SET_SERVER_FETCHING"
};

export const fetchServers = () => dispatch => {
  return dispatch(
    ApiService(ACTIONS.FETCH_SERVERS, {
      url: "/servers",
      method: "get",
      needsAuth: true
    })
  );
};

export const fetchAvailableGames = () => dispatch => {
  return dispatch(
    ApiService(ACTIONS.FETCH_AVAILABLE_GAMES, {
      url: "/games",
      method: "get"
    })
  );
};

export const createNewServer = ({ serverName, game }) => dispatch => {
  return dispatch(
    ApiService(ACTIONS.CREATE_NEW_SERVER, {
      url: "/servers",
      method: "post",
      data: {
        name: serverName,
        game
      },
      needsAuth: true
    })
  );
};

export const deleteServer = id => dispatch => {
  return dispatch({
    type: ACTIONS.DELETE_SERVER,
    payload: id
  });
};

export const resetCreateNewServer = () => dispatch => {
  return dispatch({
    type: ACTIONS.CREATE_NEW_SERVER_RESET
  });
};

export const setServerFetching = (id, state) => dispatch => {
  return dispatch({
    type: ACTIONS.SET_SERVER_FETCHING,
    payload: {
      id,
      state
    }
  });
};
