import { AuthLayout } from "../../../Hoc/Layouts";
import BaseStyle from "../Base.module.css";
import Style from "./Signup.module.css";
import PropTypes from "prop-types";
import React from "react";

export const SignupView = props => (
  <AuthLayout>
    <div className={BaseStyle.base}>
      <form className={Style.Form} onSubmit={props.register}>
        <div className="bank-info-box">
          <h3 className="heading-tertairy">Bank Information</h3>
          <div className={BaseStyle.Group}>
            <input
              className={BaseStyle.Input}
              type="text"
              id="businessname"
              placeholder="Bank Name"
              value={props.businessname}
              onChange={props.changeInput}
              required
            />
            <label className={BaseStyle.FormLabel} htmlFor="businessname">
              Bank Name
            </label>
          </div>
        </div>
        <div className={Style.ManagerInfoBox}>
          <h3 className="heading-tertairy ">Account Manager's Information</h3>
          <div className={BaseStyle.Group}>
            <input
              className={BaseStyle.Input}
              type="text"
              id="firstname"
              placeholder="Enter Your Firstname"
              value={props.firstname}
              onChange={props.changeInput}
              required
            />
            <label className={BaseStyle.FormLabel} htmlFor="firstname">
              Enter Your Firstname
            </label>
          </div>
          <div className={BaseStyle.Group}>
            <input
              className={BaseStyle.Input}
              type="text"
              id="lastname"
              placeholder="Enter Your Lastname"
              value={props.lastname}
              onChange={props.changeInput}
              required
            />
            <label className={BaseStyle.FormLabel} htmlFor="lastname">
              Enter Your Lastname
            </label>
          </div>
          <div className={BaseStyle.Group}>
            <input
              className={BaseStyle.Input}
              type="email"
              id="email"
              placeholder="Enter Your Email Address"
              value={props.email}
              onChange={props.changeInput}
              required
            />
            <label className={BaseStyle.FormLabel} htmlFor="email">
              Enter Your Email Address
            </label>
          </div>
          <div className={BaseStyle.Group}>
            <input
              className={BaseStyle.Input}
              type="tel"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={props.phone}
              onChange={props.changeInput}
              required
            />
            <label className={BaseStyle.FormLabel} htmlFor="email">
              Enter Your Email Address
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
            <input
              className={BaseStyle.Input}
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={props.confirm_password}
              onChange={props.changeInput}
              required
            />
            <label className={BaseStyle.FormLabel} htmlFor="confirm_password">
              Enter Your Password
            </label>
          </div>
        </div>
        <div className={BaseStyle.Group}>
          <button className={BaseStyle.Button}>Set me up!</button>
        </div>
      </form>
    </div>
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
