import { AuthLayout } from "../../../Hoc/Layouts";
import BaseStyle from "../Base.module.css";
import Style from "./CompleteSignup.module.css";
import PropTypes from "prop-types";
import React from "react";

export const CompleteSignupSuccess = props => (
  <AuthLayout>
    <div className={BaseStyle.base}>
      Success! . Your account is now set. Your will be automatically redirected
      to the login page ...
    </div>
  </AuthLayout>
);

CompleteSignupSuccess.propTypes = {
  changeInput: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};
