import React from "react";
import { Route, Redirect } from "react-router-dom";
import { parse } from "qs";

export default ({ children, appProps, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const parsedQuery = parse(props.location.search.slice(1));

      return !appProps.isAuthorized ? (
        children
      ) : (
        <Redirect to={parsedQuery.redirect || "/dashboard"} />
      );
    }}
  />
);
