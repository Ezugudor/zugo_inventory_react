import { AuthLayout } from "../../../Hoc/Layouts";
import BaseStyle from "../Base.module.css";
import Style from "./Login.module.css";
import PropTypes from "prop-types";
import React from "react";
import { Notification, Loading } from "../../Utils";

export const LoginView = props => (
  <AuthLayout>
    <div className={Style.LoginContainer}>
      <div className={`col-md-5`}>
        <div className={Style.LoginBody}>
          <span className={Style.AccountHeader}>Login</span>
          <br></br>
          <span className={Style.Hint} style={{ marginBottom: "2em" }}>
            Login to your to mannage your account
          </span>

          <form onSubmit={props.login}>
            <div className={`col-wd-12 col-md-12`}>
              <label className={Style.LabelAuth}>Email address</label>
              <input
                id="username"
                type="email"
                placeholder="e.g name@domain.com"
                className={Style.TextField}
                value={props.email}
                onChange={props.changeInput}
                required
              />
            </div>

            <div className={`col-wd-12 col-md-12`}>
              <label className={Style.LabelAuth}>Your password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={Style.TextField}
                value={props.password}
                onChange={props.changeInput}
                required
                style={{ marginBottom: "1em" }}
              />
            </div>

            <span className={`${Style.Hint} ${Style.ForgetPassword}`}>
              Forgot your password? <a href="register">Reset</a>
            </span>

            <div className={`col-wd-12 col-md-12`}>
              <button
                type="submit"
                placeholder="Password"
                className={Style.FormBtn}
              >
                Login
              </button>
            </div>
            <span className={Style.Hint}>
              Don't have an account? <a href="/signup">Sign Up</a>
            </span>
          </form>
        </div>
      </div>
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
