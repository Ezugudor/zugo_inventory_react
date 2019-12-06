import Style from "./Toggle.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Toggle = props => (
  <div className={Style.toggleWrapper}>
    <span className={Style.label}>{props.label}</span>
    <label className={Style.inputLabel} htmlFor="required">
      <input
        type="checkbox"
        id="required"
        className={Style.input}
        onChange={e => props.trigger()}
      />
      <span className={Style.toggleButton} />
    </label>
  </div>
);

Toggle.propTypes = {
  setQuestionProperty: PropTypes.func.isRequired,
  addValidationRule: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired
};
