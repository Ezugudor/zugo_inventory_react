import Style from "./Card.module.css";
import PropTypes from "prop-types";
import React from "react";
export const Card = props => (
  <div className={Style.Card}>
    <div className={Style.Body}>
      <div className={Style.Text}>{props.form.name}</div>
    </div>
    <div className={Style.Footer}>
      <span className={Style.FooterText}>100 Response</span>
    </div>
  </div>
);

Card.propType = {
  form: PropTypes.object.isRequired
};
