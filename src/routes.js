import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Layout from "./Hoc/Layout";
import Home from "./components/home";
import SignIn from "./components/signin";

// Admin Routes
import Dashboard from "./components/admin/Dashboard";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <Route exact component={Dashboard} path="/dashboard" />
        <Route exact component={SignIn} path="/sign_in" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;
