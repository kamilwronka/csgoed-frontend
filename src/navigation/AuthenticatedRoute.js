import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ children, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthorized ? (
          children
        ) : (
          <Redirect
            to={`/auth/signin?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
