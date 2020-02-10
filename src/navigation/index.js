import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { get } from "lodash";
import { useAuthData } from "hooks";
import { Layout } from "components/AppLayout";

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

//features
import { MainPage } from "features/MainPage";
import { Dashboard } from "features/Dashboard";
import { AuthPage } from "features/AuthPage";

import ServersDashboard from "features/Dashboard/subpages/ServersDashboard/ServersDashboard";
import Home from "features/Dashboard/subpages/Home/Home";
import SingleServerDashboard from "features/Dashboard/subpages/SingleServerDashboard/SingleServerDashboard";

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
          path="/dashboard/servers/:id"
        >
          <Layout>
            <SingleServerDashboard />
          </Layout>
        </AuthenticatedRoute>
        <AuthenticatedRoute
          appProps={{ isAuthorized: isAuthorized }}
          path="/dashboard/servers"
        >
          <Layout>
            <ServersDashboard />
          </Layout>
        </AuthenticatedRoute>
        <AuthenticatedRoute
          appProps={{ isAuthorized: isAuthorized }}
          path="/dashboard/home"
        >
          <Layout>
            <Home />
          </Layout>
        </AuthenticatedRoute>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default Navigation;
