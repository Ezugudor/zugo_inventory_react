import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React, { Component } from "react";

export class ItemConfiguration extends Component {
  minMaxException = ["account", "tel", "bvn", "mobile", "picture"];

  showMinMax = props => {
    return !this.minMaxException.includes(props.currentElement.type);
  };
  getMin = () => {
    const rules = [...this.props.currentElement.validationRules];
    const min = rules.find(rule => rule.name === "min");
    if (typeof min === "undefined") return 0;
    return min.value;
  };
  getValidationRule = (ruleName, rules) => {
    let res = rules.find(rule => rule.name == ruleName);
    if (res && res.name === "max") {
      if (res.value < this.getMin()) {
        res.value = this.getMin();
      }
    }
    return res ? res.value : ruleName === "required" ? false : 0;
  };
  handleChange = e =>
    this.props.setQuestionProperty(
      "description",
      this.props.currentElement.id,
      e.target.value,
      this.props.currentElement.parent
    );
  render() {
    return (
      <div className={Style.configuration}>
        <div className={Style.requiredRuleWrapper}>
          <span>Required</span>
          <label className={Style.inputLabel} htmlFor="required">
            <input
              type="checkbox"
              id="required"
              className={Style.input}
              onChange={e => this.props.addValidationRule("required", e)}
              checked={this.getValidationRule(
                "required",
                this.props.currentElement.validationRules
              )}
            />
            <span className={Style.toggleButton} />
          </label>
        </div>
        {this.showMinMax(this.props) ? (
          <div className={Style.minMaxRule}>
            <div className={Style.minRuleBox}>
              <span className={Style.ruleText}>Minimum Character</span>
              <input
                type="number"
                className={Style.inputValue}
                onChange={e => this.props.addValidationRule("min", e)}
                value={this.getValidationRule(
                  "min",
                  this.props.currentElement.validationRules
                )}
              />
            </div>
            <div className={Style.maxRuleBox}>
              <span className={Style.ruleText}>Maximum Character</span>
              <input
                type="number"
                className={Style.inputValue}
                onChange={e => this.props.addValidationRule("max", e)}
                value={this.getValidationRule(
                  "max",
                  this.props.currentElement.validationRules
                )}
              />
            </div>
          </div>
        ) : null}
        <label htmlFor="description">Question Description</label>
        <textarea
          id="description"
          className={Style.textarea}
          value={this.props.currentElement.description}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ItemConfiguration.propTypes = {
  setQuestionProperty: PropTypes.func.isRequired,
  addValidationRule: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired
};
