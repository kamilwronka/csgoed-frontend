import { isFunction, includes, get } from "lodash";

export const REQUEST_STATES = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
};

export const promiseMiddleware = store => next => action => {
  if (
    isFunction(action.payload) &&
    !includes(action.type, [
      REQUEST_STATES.PENDING,
      REQUEST_STATES.REJECTED,
      REQUEST_STATES.RESOLVED
    ])
  ) {
    const token = get(store.getState(), "auth.data.token", null);

    store.dispatch({
      type: `${action.type}_${REQUEST_STATES.PENDING}`
    });

    action
      .payload(token)
      .then(res =>
        store.dispatch({
          type: `${action.type}_${REQUEST_STATES.RESOLVED}`,
          payload: res.data
        })
      )
      .catch(err => {
        console.error(err);
        return store.dispatch({
          type: `${action.type}_${REQUEST_STATES.REJECTED}`,
          payload: err.response
        });
      });
  }

  if (isFunction(action.payload)) {
    return store;
  }

  let result = next(action);
  return result;
};
