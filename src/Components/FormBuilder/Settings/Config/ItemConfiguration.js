import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React from "react";

const minMaxException = ["account", "tel", "bvn", "mobile", "picture"];

const showMinMax = props => {
  return !minMaxException.includes(props.currentElement.type);
};

export const ItemConfiguration = props => (
  <div className={Style.configuration}>
    <div className={Style.requiredRuleWrapper}>
      <span>Required</span>
      <label className={Style.inputLabel} htmlFor="setRequired">
        <input
          type="checkbox"
          id="setRequired"
          className={Style.input}
          onChange={e => props.addValidationRule("required", e)}
        />
        <span className={Style.toggleButton} />
      </label>
    </div>
    {showMinMax(props) ? <MinMaxSetting /> : null}
    <label htmlFor="description">Question Description</label>
    <textarea
      id="description"
      className={Style.textarea}
      value={props.currentElement.description}
      rows={4}
      onChange={e =>
        props.setQuestionProperty(
          "description",
          props.currentElement.id,
          e.target.value
        )
      }
    />
  </div>
);

ItemConfiguration.propTypes = {
  setQuestionProperty: PropTypes.func.isRequired,
  addValidationRule: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired
};

const MinMaxSetting = props => (
  <div className={Style.minMaxRule}>
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
