import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { get } from "lodash";
import { useAuthData } from "hooks";
import { Spin } from "antd";

import { Layout } from "components/AppLayout";

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

import { MainPage } from "features/MainPage";
import { AuthPage } from "features/AuthPage";

//lazy loaded features
const AccountPage = lazy(() => import("features/AccountPage/AccountPage"));
const ServersDashboard = lazy(() =>
  import("features/ServersDashboard/ServersDashboard")
);
const Home = lazy(() => import("features/Home/Home"));
const SingleServerDashboard = lazy(() =>
  import("features/SingleServerDashboard/SingleServerDashboard")
);
const Payments = lazy(() => import("features/PaymentsPage/PaymentsPage"));
const Developers = lazy(() => import("features/DevelopersPage/DevelopersPage"));

function Navigation() {
  const { data } = useAuthData();
  const isAuthorized = get(data, "token", false);

  return (
    <Router>
      <Suspense
        fallback={
          <Layout>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spin />
            </div>
          </Layout>
        }
      >
        <Switch>
          <UnauthenticatedRoute appProps={{ isAuthorized }} path="/auth/:type">
            <AuthPage />
          </UnauthenticatedRoute>
          <AuthenticatedRoute appProps={{ isAuthorized }} path="/servers/:id">
            <Layout>
              <SingleServerDashboard />
            </Layout>
          </AuthenticatedRoute>
          <AuthenticatedRoute appProps={{ isAuthorized }} path="/servers">
            <Layout>
              <ServersDashboard />
            </Layout>
          </AuthenticatedRoute>
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
          <AuthenticatedRoute appProps={{ isAuthorized }} path="/payments">
            <Layout>
              <Payments />
            </Layout>
          </AuthenticatedRoute>
          <AuthenticatedRoute appProps={{ isAuthorized }} path="/developers">
            <Layout>
              <Developers />
            </Layout>
          </AuthenticatedRoute>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Navigation;
