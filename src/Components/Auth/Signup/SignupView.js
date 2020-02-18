import { AuthLayout } from "../../../Hoc/Layouts";
import BaseStyle from "../Base.module.css";
import Style from "./Signup.module.css";
import PropTypes from "prop-types";
import React from "react";
import { Notification, Loading } from "../../Utils";

export const SignupView = props => (
  <AuthLayout>
    <div className={Style.LoginContainer}>
      <div className={`col-md-5`}>
        <div className={Style.LoginBody}>
          <span className={Style.AccountHeader}>Register</span>
          <br></br>
          <span className={Style.Hint} style={{ marginBottom: "2em" }}>
            Create a new account to begin!
          </span>

          <form method="post">
            <div className={`col-wd-12 col-md-12`}>
              <label className={Style.LabelAuth}>Email address</label>
              <input
                type="email"
                placeholder="e.g name@domain.com"
                className={Style.TextField}
              />
            </div>

            <div className={`col-wd-12 col-md-12`}>
              <label className={Style.LabelAuth}>Your password</label>
              <input
                type="password"
                placeholder="Password"
                className={Style.TextField}
                // style={{ marginBottom: "1em" }}
              />
            </div>

            <div className={`col-wd-12 col-md-12`}>
              <label className={Style.LabelAuth}>Confirm password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className={Style.TextField}
                style={{ marginBottom: "1em" }}
              />
            </div>

            <div className={`col-wd-12 col-md-12`}>
              <label className="auth" className={Style.ContainerCheckbox}>
                Accept <a href="#">Terms & Conditions</a>
                <input type="checkbox" className={Style.CheckboxInput} />
                <span className={Style.CheckboxCheckmark}></span>
              </label>
            </div>

            <div className={`col-wd-12 col-md-12`}>
              <button type="submit" className={Style.FormBtn}>
                Create account
              </button>
            </div>
            <span className={Style.Hint}>
              Have an account? <a href="/login">Login</a>
            </span>
          </form>
        </div>
      </div>
    </div>
    <Loading showLoading={props.showLoading} />
    <Notification title={"Default Title"} message={"Default Body Message"} />
  </AuthLayout>
);

SignupView.propTypes = {
  confirm_password: PropTypes.string.isRequired,
  businessname: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};
