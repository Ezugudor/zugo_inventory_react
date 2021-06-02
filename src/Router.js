import {
  BusinessSettings,
  FormResponse,
  Dashboard,
  Stocks,
  Responses,
  Signup,
  Receivings,
  ReceivingSum,
  Supply,
  SupplySum,
  SupplyDistribute,
  SupplyPreview,
  Payment,
  Login,
  Team,
  Customer,
  Driver,
  Outlet,
  Credit,
  CreditSum,
  Company
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
      console.log("logging the states from route", state);
      const token = state.user.token;
      SwypPartnerApi.defaults.headers.common["Authorization"] = token;
      return token ? <Component {...props} /> : <Redirect to="/login" />;
    }}
  />
);

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const state = Store.getState();
      const token = state.user.token;
      SwypPartnerApi.defaults.headers.common["Authorization"] = token;
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
        (currentUser.role === "manager" ||
          currentUser.role === "admin" ||
          currentUser.role === 3) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      );
    }}
  />
);

export default () => (
  <Switch>
    <PrivateRoute exact path="/response/:type/:id" component={FormResponse} />
    <PrivateRoute exact path="/forms/:id/responses" component={Responses} />
    {/* <PrivateRoute exact path="/formtypes/:parent/:name" component={Form} /> */}
    {/* <ManagerRoute exact path="/settings" component={BusinessSettings} /> */}
    <ManagerRoute
      exact
      path="/business/settings/:id"
      component={BusinessSettings}
    />
    <PrivateRoute exact path="/receivings" component={Receivings} />
    <PrivateRoute exact path="/receivingsum" component={ReceivingSum} />
    <PrivateRoute exact path="/stocks" component={Stocks} />
    <PrivateRoute exact path="/supply" component={Supply} />
    <PrivateRoute exact path="/supplysum" component={SupplySum} />
    <PrivateRoute exact path="/distribute" component={SupplyDistribute} />
    <PrivateRoute exact path="/previewcode/:id" component={SupplyPreview} />
    <PrivateRoute exact path="/credit" component={Credit} />
    <PrivateRoute exact path="/creditsum" component={CreditSum} />
    <PrivateRoute exact path="/payment" component={Payment} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <GuestRoute exact path="/signup" component={Signup} />
    <ManagerRoute exact path="/outlet_manager" component={Team} />
    <ManagerRoute exact path="/team" component={Team} />
    <PrivateRoute exact path="/users" component={Team} />
    <PrivateRoute exact path="/admin" component={Team} />
    <PrivateRoute exact path="/customers" component={Customer} />
    <PrivateRoute exact path="/drivers" component={Driver} />
    <PrivateRoute exact path="/companies" component={Company} />
    <PrivateRoute exact path="/outlets" component={Outlet} />
    <GuestRoute exact path="/login" component={Login} />
    {/* <GuestRoute
      exact
      path="/completesignup/:token"
      component={CompleteSignup}
    /> */}
    <GuestRoute exact path="/" component={Login} />
  </Switch>
);
