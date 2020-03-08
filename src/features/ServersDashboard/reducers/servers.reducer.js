import createReducer from "store/reducer.factory";
// import { REQUEST_STATES } from "middleware/promiseMiddleware";

import { ACTIONS } from "../actions/servers.actions";

const additionalCases = {};

additionalCases[ACTIONS.DELETE_SERVER] = (state, action) => {
  return {
    ...state,
    data: state.data.filter(value => value.Id !== action.payload)
  };
};

additionalCases[ACTIONS.SET_SERVER_FETCHING] = (state, action) => {
  return {
    ...state,
    data: state.data.map(value => {
      if (value.Id === action.payload.id) {
        return { ...value, State: action.payload.state };
      } else {
        return value;
      }
    })
  };
};

additionalCases[ACTIONS.FILTER_SERVERS] = (state, action) => {
  return {
    ...state,
    searchData: state.data.filter(
      value =>
        value.Labels.name
          .toLowerCase()
          .indexOf(action.payload.toLowerCase()) !== -1
    )
  };
};

export default createReducer(ACTIONS.FETCH_SERVERS, { additionalCases });
