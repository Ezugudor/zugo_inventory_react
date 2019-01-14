import {
  BusinessSettings,
  UserResponse,
  FormBuilder,
  Dashboard,
  Responses,
  FormTypes,
  Login,
  Signup,
  Form
} from "./Containers";
import { Redirect, Switch, Route } from "react-router-dom";
import { SwypPartnerApi } from "./core";
import Store from "./store";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const state = Store.getState();
      const token = state.user.token;
      SwypPartnerApi.defaults.headers.common["Authorization"] = token;
      return token ? <Component {...props} /> : <Redirect to="/" />;
    }}
  />
);

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const state = Store.getState();
      const token = state.user.token;
      return token ? <Redirect to="/dashboard" /> : <Component {...props} />;
    }}
  />
);

const ManagerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const state = Store.getState();
      const currentUser = state.user.currentUser;
      const token = state.user.token;
      SwypPartnerApi.defaults.headers.common["Authorization"] = token;
      return currentUser &&
        (currentUser.role === "manager" || currentUser.role === "admin") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      );
    }}
  />
);

export default () => (
  <Switch>
    <PrivateRoute exact path="/response/:type/:id" component={UserResponse} />
    <PrivateRoute exact path="/forms/:id/responses" component={Responses} />
    <PrivateRoute exact path="/formtypes/:parent/:name" component={Form} />
    <ManagerRoute exact path="/settings" component={BusinessSettings} />
    <PrivateRoute exact path="/formbuilder" component={FormBuilder} />
    <PrivateRoute exact path="/formtypes" component={FormTypes} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <GuestRoute exact path="/signup" component={Signup} />
    <GuestRoute exact path="/login" component={Login} />
    <GuestRoute exact path="/" component={Login} />
  </Switch>
);
