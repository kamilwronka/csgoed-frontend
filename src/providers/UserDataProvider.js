import React, { useReducer } from "react";
import UserDataContext from "contexts/UserDataContext";
import { UserService } from "services/user.service";

const USER_INITIAL_DATA = {
  data: null,
  fetching: false,
  intact: true,
  error: null,
};

const reducer = (state = USER_INITIAL_DATA, action) => {
  let desiredState;

  switch (action.type) {
    case "pending":
      desiredState = { ...state, fetching: true, intact: false };
      break;
    case "fulfilled":
      desiredState = { ...state, data: action.payload, fetching: false };
      break;
    case "error":
      desiredState = { ...state, error: action.payload, fetching: false };
      break;
    default:
      desiredState = state;
  }

  return desiredState;
};

const UserDataProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, USER_INITIAL_DATA);

  const fetchUserData = async () => {
    dispatch({ type: "pending" });

    try {
      const response = await UserService({ needsAuth: true }).get(
        "/users/current-user"
      );

      dispatch({ type: "fulfilled", payload: response.data });
    } catch (error) {
      dispatch({ type: "error", payload: error.response });
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        fetchUserData,
        data: state.data,
        fetching: state.fetching,
        intact: state.intact,
      }}
    >
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
