import { AuthLayout } from "../../Hoc/Layouts";
import Style from "./Signup.module.css";
import React, { Component } from "react";

export class Signup extends Component {
  render() {
    return (
      <AuthLayout>
        <div className={Style.Signup}>
          <form className={Style.Form}>
            <div className="bank-info-box">
              <h3 className="heading-tertairy">Bank Information</h3>
              <div className={Style.Group}>
                <input
                  className={Style.Input}
                  type="text"
                  id="b_name"
                  placeholder="Bank Name"
                />
                <label className={Style.FormLabel} htmlFor="b_name">
                  Bank Name
                </label>
              </div>
            </div>
            <div className={Style.ManagerInfoBox}>
              <h3 className="heading-tertairy ">
                Account Manager's Information
              </h3>
              <div className={Style.Group}>
                <input
                  className={Style.Input}
                  type="text"
                  id="first_name"
                  placeholder="Enter Your Firstname"
                />
                <label className={Style.FormLabel} htmlFor="first_name">
                  Enter Your Firstname
                </label>
              </div>
              <div className={Style.Group}>
                <input
                  className={Style.Input}
                  type="text"
                  id="last_name"
                  placeholder="Enter Your Lastname"
                />
                <label className={Style.FormLabel} htmlFor="last_name">
                  Enter Your Lastname
                </label>
              </div>
              <div className={Style.Group}>
                <input
                  className={Style.Input}
                  type="text"
                  id="email"
                  placeholder="Enter Your Work Email"
                />
                <label className={Style.FormLabel} htmlFor="email">
                  Enter Your Work Email
                </label>
              </div>
              <div className={Style.Group}>
                <input
                  className={Style.Input}
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                <label className={Style.FormLabel} htmlFor="password">
                  Enter Your Password
                </label>
              </div>
            </div>
            <div className={Style.Group}>
              <button className={Style.Button}>Set me up!</button>
            </div>
          </form>
        </div>
      </AuthLayout>
    );
  }
}
