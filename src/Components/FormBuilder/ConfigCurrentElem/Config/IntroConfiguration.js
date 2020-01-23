import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React from "react";
import { Component } from "react";

export class IntroConfiguration extends Component {
  componentWillUpdate() {
    console.log(
      "checking the two way bind2",
      this.props.currentElement.children
    );
  }

  render() {
    const isChecked = (introChildType, elem) => {
      console.log("checked action");
      let match = false;
      const introChildren = [...elem.children];
      introChildren.forEach(child => {
        if (child.name === introChildType) {
          match = true;
          // return;
        }
      });
      return match || false;
    };

    return (
      <div className={Style.configuration}>
        <div className={Style.requiredRuleWrapper}>
          <span>ID Card</span>
          <label className={Style.inputLabel}>
            <input
              type="checkbox"
              id="required"
              className={Style.input}
              onChange={() =>
                this.props.addQuestionIntroChild({
                  name: "id-card",
                  description: "A digital/Scanned Copy of your valid ID Card"
                })
              }
              checked={isChecked("id-card", this.props.currentElement)}
            />
            <span htmlFor="required" className={Style.toggleButton} />
          </label>
        </div>
        <div className={Style.requiredRuleWrapper}>
          <span>Signature</span>
          <label className={Style.inputLabel}>
            <input
              type="checkbox"
              id="required"
              className={Style.input}
              onChange={() =>
                this.props.addQuestionIntroChild({
                  name: "signature",
                  description: "A digital/Scanned Copy of your signature"
                })
              }
              checked={isChecked("signature", this.props.currentElement)}
            />
            <span htmlFor="required" className={Style.toggleButton} />
          </label>
        </div>
        <div className={Style.requiredRuleWrapper}>
          <span>Passport</span>
          <label className={Style.inputLabel}>
            <input
              type="checkbox"
              id="required"
              className={Style.input}
              onChange={() =>
                this.props.addQuestionIntroChild({
                  name: "passport",
                  description: "A digital/Scanned Copy of your passport"
                })
              }
              checked={isChecked("passport", this.props.currentElement)}
            />
            <span htmlFor="required" className={Style.toggleButton} />
          </label>
        </div>
        <div className={Style.requiredRuleWrapper}>
          <span>Reference Letter</span>
          <label className={Style.inputLabel}>
            <input
              type="checkbox"
              id="required"
              className={Style.input}
              onChange={() =>
                this.props.addQuestionIntroChild({
                  name: "letter",
                  description: "A Scanned Copy of a reference latter"
                })
              }
              checked={isChecked("letter", this.props.currentElement)}
            />
            <span htmlFor="required" className={Style.toggleButton} />
          </label>
        </div>
      </div>
    );
  }
}

IntroConfiguration.propTypes = {
  addQuestionIntroChild: PropTypes.func.isRequired
};
