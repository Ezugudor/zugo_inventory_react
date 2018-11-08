import { AuthLayout } from "../../../Hoc/Layouts";
import BaseStyle from "../Base.module.css";
import Style from "./Signup.module.css";
import React from "react";

export const Signup = props => (
  <AuthLayout>
    <div className={BaseStyle.base}>
      <form className={Style.Form}>
        <div className="bank-info-box">
          <h3 className="heading-tertairy">Bank Information</h3>
          <div className={BaseStyle.Group}>
            <input
              className={BaseStyle.Input}
              type="text"
              id="b_name"
              placeholder="Bank Name"
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
              id="first_name"
              placeholder="Enter Your Firstname"
            />
            <label className={BaseStyle.FormLabel} htmlFor="first_name">
              Enter Your Firstname
            </label>
          </div>
          <div className={BaseStyle.Group}>
            <input
              className={BaseStyle.Input}
              type="text"
              id="last_name"
              placeholder="Enter Your Lastname"
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
