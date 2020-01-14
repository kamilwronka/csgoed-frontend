import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ children, appProps, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !appProps.isAuthorized ? children : <Redirect to="/dashboard/home" />
    }
  />
);
