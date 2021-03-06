import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Layout } from "components/AppLayout";

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

import { AuthPage } from "features/AuthPage";

import { Home } from "features/Home";
import { ServersDashboard } from "features/ServersDashboard";
import { SingleServerDashboard } from "features/SingleServerDashboard";
import { AccountPage } from "features/AccountPage";
import { PaymentsPage } from "features/PaymentsPage";
import { DevelopersPage } from "features/DevelopersPage";
import { AccountActivationPage } from "features/AccountActivationPage";
import useAuth from "hooks/useAuth";

function Navigation() {
  const { state } = useAuth();

  const isAuthorized = state.data.authorized;

  return (
    <Router>
      <Switch>
        <Route path="/auth/activate" isExact>
          <AccountActivationPage />
        </Route>
        <UnauthenticatedRoute appProps={{ isAuthorized }} path="/auth/:type">
          <AuthPage />
        </UnauthenticatedRoute>
        {/* <AuthenticatedRoute
          appProps={{ isAuthorized }}
          path="/servers/:game/:id"
        >
          <Layout>
            <SingleServerDashboard />
          </Layout>
        </AuthenticatedRoute> */}
        {/* <AuthenticatedRoute appProps={{ isAuthorized }} path="/servers">
          <Layout>
            <ServersDashboard />
          </Layout>
        </AuthenticatedRoute> */}
        <AuthenticatedRoute appProps={{ isAuthorized }} path="/dashboard">
          <Layout>
            <Home />
          </Layout>
        </AuthenticatedRoute>
        <AuthenticatedRoute appProps={{ isAuthorized }} path="/account">
          <Layout>
            <AccountPage />
          </Layout>
        </AuthenticatedRoute>
        {/* <AuthenticatedRoute appProps={{ isAuthorized }} path="/payments">
          <Layout>
            <PaymentsPage />
          </Layout>
        </AuthenticatedRoute> */}
        <AuthenticatedRoute appProps={{ isAuthorized }} path="/developers">
          <Layout>
            <DevelopersPage />
          </Layout>
        </AuthenticatedRoute>
        <Route path="/">
          <Redirect to="/auth/signin" />
        </Route>
      </Switch>
    </Router>
  );
}

export default Navigation;
