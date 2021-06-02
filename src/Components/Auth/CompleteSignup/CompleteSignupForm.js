import { AuthLayout } from "../../../Hoc/Layouts";
import BaseStyle from "../Base.module.css";
import Style from "./CompleteSignup.module.css";
import PropTypes from "prop-types";
import React from "react";

export const CompleteSignupForm = props => (
  <AuthLayout>
    <div className={BaseStyle.base}>
      <form className={Style.Form} onSubmit={props.login}>
        <div className={BaseStyle.Group}>
          <input
            className={BaseStyle.Input}
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={props.password}
            onChange={props.changeInput}
            required
          />
          <label className={BaseStyle.FormLabel} htmlFor="password">
            Enter Your Password
          </label>
        </div>
        <div className={BaseStyle.Group}>
          <input
            className={BaseStyle.Input}
            type="password"
            id="cpassword"
            placeholder="Confirm Password"
            value={props.cpassword}
            onChange={props.changeInput}
            required
          />
          <label className={BaseStyle.FormLabel} htmlFor="password">
            Confirm Password
          </label>
        </div>
        <div className={BaseStyle.Group}>
          <button className={BaseStyle.Button}>Proceed</button>
        </div>
      </form>
    </div>
  </AuthLayout>
);

CompleteSignupForm.propTypes = {
  changeInput: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};
