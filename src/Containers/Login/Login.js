import { AuthLayout } from "../../Hoc/Layouts";
import React, { Component } from "react";
import Style from "./Login.module.css";

export class Login extends Component {
  render() {
    return (
      <AuthLayout>
        <div className={Style.Login}>
          <form className={Style.Form}>
            <div className={Style.Group}>
              <input
                className={Style.Input}
                type="text"
                id="email"
                placeholder="Enter Your Email"
              />
              <label className={Style.FormLabel} htmlFor="email">
                Enter Your Email
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
            <div className={Style.Group}>
              <button className={Style.Button}>Take me in!</button>
            </div>
          </form>
        </div>
      </AuthLayout>
    );
  }
}
