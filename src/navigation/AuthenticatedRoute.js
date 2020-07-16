import React from "react";
import { Route, Redirect } from "react-router-dom";
import { SocketIOProvider } from "use-socketio";
import { get } from "lodash";

import { API_CONFIG } from "config";
import Notifications from "components/Notifications/Notifications";
import useAuth from "hooks/useAuth";

export default function AuthenticatedRoute({ children, appProps, ...rest }) {
  const { state } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        appProps.isAuthorized ? (
          <>
            {/* <Notifications /> */}
            {children}
          </>
        ) : (
          // <SocketIOProvider
          //   url={API_CONFIG.API_URL}
          //   opts={{ query: { token: get(state, "accessToken") } }}
          // >
          //   <Notifications />
          //   {children}
          // </SocketIOProvider>
          <Redirect
            to={`/auth/signin?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
