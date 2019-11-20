import { AuthLayout } from "../../../Hoc/Layouts";
import BaseStyle from "../Base.module.css";
import Style from "./Login.module.css";
import PropTypes from "prop-types";
import React from "react";
import { Notification, Loading } from "../../Utils";

export const LoginView = props => (
  <AuthLayout>
    <div className={BaseStyle.base}>
      <form className={Style.Form} onSubmit={props.login}>
        <div className={BaseStyle.Group}>
          <input
            className={BaseStyle.Input}
            type="text"
            id="email"
            placeholder="Enter Your Email"
            value={props.email}
            onChange={props.changeInput}
            required
          />
          <label className={BaseStyle.FormLabel} htmlFor="email">
            Enter Your Email
          </label>
        </div>
        <div className={BaseStyle.Group}>
          <input
            className={BaseStyle.Input}
            type="password"
            id="password"
            placeholder="Password"
            value={props.password}
            onChange={props.changeInput}
            required
          />
          <label className={BaseStyle.FormLabel} htmlFor="password">
            Enter Your Password
          </label>
        </div>
        <div className={BaseStyle.Group}>
          <button className={BaseStyle.Button}>Login</button>
        </div>
      </form>
    </div>
    <Loading showLoading={props.showLoading} />
    <Notification title={"Default Title"} message={"Default Body Message"} />
  </AuthLayout>
);

LoginView.propTypes = {
  changeInput: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};
