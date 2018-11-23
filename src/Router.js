import {
  FormBuilder,
  FormTypes,
  Login,
  Signup,
  Form,
  ResponseCanvas
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

const QuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const state = Store.getState();
      const token = state.user.token;
      return token ? <Redirect to="/formtypes" /> : <Component {...props} />;
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
    <PrivateRoute exact path="/formtypes/:parent/:child" component={Form} />
    <PrivateRoute exact path="/responsecanvas" component={ResponseCanvas} />
    <PrivateRoute exact path="/formbuilder" component={FormBuilder} />
    <PrivateRoute exact path="/formtypes" component={FormTypes} />
    <PrivateRoute exact path="/signup" component={Signup} />
    <QuestRoute exact path="/login" component={Login} />
    <QuestRoute exact path="/" component={Login} />
  </Switch>
);
