import { AuthLayout } from "../../../Hoc/Layouts";
import BaseStyle from "../Base.module.css";
import Style from "./CompleteSignup.module.css";
import PropTypes from "prop-types";
import React from "react";

export const CompleteSignupExpired = props => (
  <AuthLayout>
    <div className={BaseStyle.base}>Expired or does not exist</div>
  </AuthLayout>
);

CompleteSignupExpired.propTypes = {
  changeInput: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};
