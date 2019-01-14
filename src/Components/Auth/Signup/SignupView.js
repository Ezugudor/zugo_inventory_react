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
            <label className={BaseStyle.FormLabel} htmlFor="b_name">
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
            <label className={BaseStyle.FormLabel} htmlFor="first_name">
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
            <label className={BaseStyle.FormLabel} htmlFor="last_name">
              Enter Your Lastname
            </label>
          </div>
          <div className={BaseStyle.Group}>
            <input
              className={BaseStyle.Input}
              type="text"
              id="email"
              placeholder="Enter Your Work Email"
              value={props.email}
              onChange={props.changeInput}
              required
            />
            <label className={BaseStyle.FormLabel} htmlFor="email">
              Enter Your Work Email
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
        </div>
        <div className={BaseStyle.Group}>
          <button className={BaseStyle.Button}>Set me up!</button>
        </div>
      </form>
    </div>
  </AuthLayout>
);

SignupView.propTypes = {
  businessname: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
