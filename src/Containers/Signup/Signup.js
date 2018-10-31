import { AuthLayout } from '../../Hoc/Layouts';
import React, { Component } from 'react';

export class Signup extends Component {
  render() {
    return (
      <AuthLayout>
        <div className="auth-card">
          <form className="form">
            <div className="bank-info-box">
              <h3 className="header__tertiary">Bank Information</h3>
              <div className="form__group">
                <input
                  className="form__input"
                  type="text"
                  id="b_name"
                  placeholder="Bank Name"
                />
                <label className="form__label" htmlFor="b_name">
                  Bank Name
                </label>
              </div>
            </div>
            <div className="manager-info-box">
              <h3 className="header__tertiary">
                Account Manager's Information
              </h3>
              <div className="form__group">
                <input
                  className="form__input"
                  type="text"
                  id="first_name"
                  placeholder="Enter Your Firstname"
                />
                <label className="form__label" htmlFor="first_name">
                  Enter Your Firstname
                </label>
              </div>
              <div className="form__group">
                <input
                  className="form__input"
                  type="text"
                  id="last_name"
                  placeholder="Enter Your Lastname"
                />
                <label className="form__label" htmlFor="last_name">
                  Enter Your Lastname
                </label>
              </div>
              <div className="form__group">
                <input
                  className="form__input"
                  type="text"
                  id="email"
                  placeholder="Enter Your Work Email"
                />
                <label className="form__label" htmlFor="email">
                  Enter Your Work Email
                </label>
              </div>
              <div className="form__group">
                <input className="form__input" type="password" id="password" />
                <label className="form__label" htmlFor="password">
                  Enter Your Password
                </label>
              </div>
            </div>
            <div className="form__group">
              <button className="btn form__button">Set me up!</button>
            </div>
          </form>
        </div>
      </AuthLayout>
    );
  }
}
