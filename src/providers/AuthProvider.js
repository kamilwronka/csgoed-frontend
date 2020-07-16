import React, { useEffect, useReducer } from "react";
import AuthContext from "contexts/AuthContext";
import { AuthService } from "services/auth.service";
import { LocalStorage } from "services/localstorage.service";
import { isEmpty } from "lodash";
import { emitter, EMITTER_EVENTS } from "services/event.service";
import fingerprint from "fingerprintjs2";
import { useTranslation } from "react-i18next";

const AUTH_INITIAL_DATA = {
  data: {
    accessToken: null,
    refreshToken: null,
    authorized: false,
  },
  fetching: false,
  intact: true,
  error: null,
};

const authReducer = (state = AUTH_INITIAL_DATA, action) => {
  let desiredState;

  switch (action.type) {
    case "pending":
      desiredState = { ...state, fetching: true, intact: false };
      break;
    case "fulfilled":
      desiredState = { ...state, data: action.payload, fetching: false };
      break;
    case "update":
      desiredState = { ...state, data: action.payload };
      break;
    case "error":
      desiredState = { ...state, error: action.payload, fetching: false };
      break;
    case "reset":
      desiredState = AUTH_INITIAL_DATA;
      break;
    default:
      desiredState = state;
  }

  LocalStorage.set("auth", desiredState.data);

  return desiredState;
};

const getBrowserFingerprint = async () => {
  return new Promise((resolve, reject) => {
    fingerprint.get((components) => {
      return resolve(fingerprint.x64hash128(JSON.stringify(components)));
    });
  });
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_DATA);
  const authService = AuthService({ needsAuth: false });
  const { i18n } = useTranslation();

  const signIn = async ({ email, password, remember }) => {
    try {
      dispatch({ type: "pending" });

      const fingerprint = await getBrowserFingerprint();

      const response = await authService.post("/signin", {
        email,
        password,
        fingerprint,
      });

      const newState = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        authorized: true,
      };

      dispatch({ type: "fulfilled", payload: newState });
    } catch (error) {
      dispatch({ type: "error", payload: error.response });
    }
  };

  const signUp = async ({ email, password, firstName, lastName }) => {
    try {
      dispatch({ type: "pending" });
      const fingerprint = await getBrowserFingerprint();
      const language = i18n.languages[0];

      const response = await authService.post("/signup", {
        email,
        password,
        firstName,
        lastName,
        fingerprint,
        language,
      });

      const newState = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        authorized: true,
      };

      dispatch({ type: "fulfilled", payload: newState });
    } catch (error) {
      dispatch({ type: "error", payload: error.response });
    }
  };

  const logout = () => {
    dispatch({ type: "reset" });
  };

  useEffect(() => {
    const dataFromLocalStorage = LocalStorage.get("auth");
    !isEmpty(dataFromLocalStorage) &&
      dispatch({ type: "update", payload: dataFromLocalStorage });

    const onChange = (value) => {
      dispatch({ type: "update", payload: value });
    };

    const subscription = emitter.addListener(
      EMITTER_EVENTS.SYNC_AUTH_DATA,
      onChange
    );

    return () => {
      subscription.remove(EMITTER_EVENTS.SYNC_AUTH_DATA, onChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, state, logout, signUp }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
