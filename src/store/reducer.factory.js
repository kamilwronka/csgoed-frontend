import { REQUEST_STATES } from "middleware/promiseMiddleware";

export const BASE_INITIAL_STATE = {
  data: null,
  intact: true,
  fetching: false,
  error: null
};

function createReducer(type, options = {}) {
  const additionalCases = options.additionalCases || {};

  const normalizedCases = Object.keys(additionalCases).map(key => {
    return {
      type: key,
      action: additionalCases[`${key}`]
    };
  });

  const cases = [
    {
      type: `${type}_${REQUEST_STATES.PENDING}`,
      action: (state, action) => {
        return { ...state, fetching: true, intact: false };
      }
    },
    {
      type: `${type}_${REQUEST_STATES.RESOLVED}`,
      action: (state, action) => {
        return { ...state, data: action.payload, fetching: false };
      }
    },
    {
      type: `${type}_${REQUEST_STATES.REJECTED}`,
      action: (state, action) => {
        return { ...state, error: action.payload, fetching: false };
      }
    },
    {
      type: `${type}_RESET`,
      action: state => options.initialState || BASE_INITIAL_STATE
    },
    ...normalizedCases
  ];

  return function(state = options.initialState || BASE_INITIAL_STATE, action) {
    let desiredState = state;

    cases.forEach(desiredCase => {
      if (desiredCase.type === action.type) {
        desiredState = desiredCase.action(state, action);
      }
    });

    return desiredState;
  };
}

export default createReducer;
