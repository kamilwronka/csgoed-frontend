import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { get } from "lodash";

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

//features
import { MainPage } from "features/MainPage";
import { Dashboard } from "features/Dashboard";
import { AuthPage } from "features/AuthPage";

import { useAuthData } from "hooks";

function Navigation() {
  const { data } = useAuthData();
  const isAuthorized = get(data, "token", false);

  return (
    <Router>
      <Switch>
        <UnauthenticatedRoute
          appProps={{ isAuthorized: isAuthorized }}
          path="/auth/:type"
        >
          <AuthPage />
        </UnauthenticatedRoute>
        <AuthenticatedRoute
          appProps={{ isAuthorized: isAuthorized }}
          path="/dashboard/:subpage"
        >
          <Dashboard />
        </AuthenticatedRoute>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default Navigation;
