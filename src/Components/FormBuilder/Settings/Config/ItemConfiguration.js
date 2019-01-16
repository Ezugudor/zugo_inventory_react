import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React from "react";

const minMaxException = ["account", "tel", "bvn", "mobile", "picture"];

const showMinMax = props => {
  return !minMaxException.includes(props.currentElementType);
};

export const ItemConfiguration = props => (
  <div className={Style.configuration}>
    <div className={Style.requiredRuleWrapper}>
      <span>Required</span>
      <label className={Style.inputLabel} htmlFor="required">
        <input
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={e => props.addValidationRule("required", e)}
        />
        <span className={Style.toggleButton} />
      </label>
    </div>
    {showMinMax(props) ? <MinMaxSetting /> : null}
  </div>
);

ItemConfiguration.propTypes = {
  currentElementType: PropTypes.string.isRequired,
  addValidationRule: PropTypes.func.isRequired
};

const MinMaxSetting = props => (
  <div>
    <div className={Style.minRuleBox}>
      <span className={Style.ruleText}>Minimum Character</span>
      <input
        type="number"
        className={Style.inputValue}
        onChange={e => props.addValidationRule("min", e)}
      />
    </div>
    <div className={Style.maxRuleBox}>
      <span className={Style.ruleText}>Maximum Character</span>
      <input
        type="number"
        className={Style.inputValue}
        onChange={e => props.addValidationRule("max", e)}
      />
    </div>
  </div>
);
