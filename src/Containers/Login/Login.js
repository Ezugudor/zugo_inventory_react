import {AuthLayout} from "../../Hoc/Layouts";
import React, {Component} from "react";

export class Login extends Component {
  render() {
    return (
      <AuthLayout>
        <div className="auth-card">
          <form className="form">
            <div className="form__group">
              
              <input className="form__input" type="text" id="email" placeholder="Enter Your Email"></input>
              <label className="form__label" htmlFor="email">Enter Your Email</label>
            </div>
            <div className="form__group">
              <input className="form__input" type="password" id="password"></input>
              <label className="form__label" htmlFor="password">Enter Your Password</label>
            </div>
            <div className="form__group">
              <button className="btn form__button">Take me in!</button>
            </div>
          </form>
        </div>
      </AuthLayout>
    )
  }
} 