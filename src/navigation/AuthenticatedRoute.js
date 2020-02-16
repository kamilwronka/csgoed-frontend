import React from "react";
import { Route, Redirect } from "react-router-dom";
import { SocketIOProvider } from "use-socketio";

import { API_CONFIG } from "config";
import Notifications from "components/Notifications/Notifications";

export default function AuthenticatedRoute({ children, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthorized ? (
          <SocketIOProvider url={API_CONFIG.API_URL}>
            <Notifications />
            {children}
          </SocketIOProvider>
        ) : (
          <Redirect
            to={`/auth/signin?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
