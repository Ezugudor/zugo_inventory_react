import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React, { Component } from "react";

export class ItemConfiguration extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   min: 0,
    //   max: 0,
    //   required: false
    // };
  }

  // componentWillUpdate() {
  //   console.log(
  //     "checking the two way bind",
  //     this.props.currentElement.validationRules
  //   );
  // }

  minMaxException = ["account", "tel", "bvn", "mobile", "picture"];

  showMinMax = props => {
    return !this.minMaxException.includes(props.currentElement.type);
  };

  getValidationRule = (ruleName, rules) => {
    let res = rules.find(rule => rule.name == ruleName);
    return res ? res.value : 10;
  };

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
          onChange={e =>
            this.props.setQuestionProperty(
              "description",
              this.props.currentElement.id,
              e.target.value
            )
          }
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
