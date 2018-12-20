import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React from "react";

export const ItemConfiguration = props => (
  <div className={Style.configuration}>
    <div className={Style.requiredRuleWrapper}>
      <span>Required</span>
      <label className={Style.inputLabel}>
        <input
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={e => props.handleRequirementInput("required", e)}
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>
    <div className={Style.minRuleBox}>
      <span className={Style.ruleText}>Minimum Character</span>
      <input
        type="number"
        className={Style.inputValue}
        onChange={e => props.handleRequirementInput("min", e)}
      />
    </div>
    <div className={Style.maxRuleBox}>
      <span className={Style.ruleText}>Maximum Character</span>
      <input
        type="number"
        className={Style.inputValue}
        onChange={e => props.handleRequirementInput("max", e)}
      />
    </div>
  </div>
);

ItemConfiguration.propTypes = {
  handleRequirementInput: PropTypes.func.isRequired
};
