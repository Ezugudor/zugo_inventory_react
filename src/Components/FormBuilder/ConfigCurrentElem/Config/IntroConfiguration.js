import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React, { Component } from "react";

export class IntroConfiguration extends Component {
  checker = (introChildType, elem) => {
    let match = false;
    const introChildren = [...elem.children];
    introChildren.forEach(child => {
      if (child.name === introChildType) {
        match = true;
        return;
      }
    });
    return match;
  };

  render() {
    return (
      <div className={Style.configuration}>
        <div className={Style.requiredRuleWrapper}>
          <span>ID Card</span>
          <label className={Style.inputLabel} htmlFor="required">
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
              checked={this.checker("id-card", this.props.currentElement)}
            />
            <span htmlFor="requidred" className={Style.toggleButton} />
          </label>
        </div>
        <div className={Style.requiredRuleWrapper}>
          <span>Signature</span>
          <label htmlFor="required1" className={Style.inputLabel}>
            <input
              type="checkbox"
              id="required1"
              className={Style.input}
              onChange={() =>
                this.props.addQuestionIntroChild({
                  name: "signature",
                  description: "A digital/Scanned Copy of your signature"
                })
              }
              checked={this.checker("signature", this.props.currentElement)}
            />
            <span htmlFor="required1" className={Style.toggleButton} />
          </label>
        </div>
        <div className={Style.requiredRuleWrapper}>
          <span>Passport</span>
          <label className={Style.inputLabel} htmlFor="required2">
            <input
              type="checkbox"
              id="required2"
              className={Style.input}
              onChange={() =>
                this.props.addQuestionIntroChild({
                  name: "passport",
                  description: "A digital/Scanned Copy of your passport"
                })
              }
              checked={this.checker("passport", this.props.currentElement)}
            />
            <span htmlFor="requiredd2" className={Style.toggleButton} />
          </label>
        </div>
        <div className={Style.requiredRuleWrapper}>
          <span>Reference Letter</span>
          <label className={Style.inputLabel} htmlFor="required3">
            <input
              type="checkbox"
              id="required3"
              className={Style.input}
              onChange={() =>
                this.props.addQuestionIntroChild({
                  name: "letter",
                  description: "A Scanned Copy of a reference latter"
                })
              }
              checked={this.checker("letter", this.props.currentElement)}
            />
            <span htmlFor="requiredd3" className={Style.toggleButton} />
          </label>
        </div>
      </div>
    );
  }
}

IntroConfiguration.propTypes = {
  addQuestionIntroChild: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired
};
