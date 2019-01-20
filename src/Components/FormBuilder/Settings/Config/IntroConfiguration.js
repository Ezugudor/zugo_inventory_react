import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React from "react";

export const IntroConfiguration = props => (
  <div className={Style.configuration}>
    <div className={Style.requiredRuleWrapper}>
      <span>ID Card</span>
      <label className={Style.inputLabel}>
        <input
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addQuestionIntroChild({
              name: "id-card",
              description: "A digital/Scanned Copy of your valid ID Card"
            })
          }
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
            props.addQuestionIntroChild({
              name: "signature",
              description: "A digital/Scanned Copy of your signature"
            })
          }
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
            props.addQuestionIntroChild({
              name: "passport",
              description: "A digital/Scanned Copy of your signature"
            })
          }
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
            props.addQuestionIntroChild({
              name: "letter",
              description: "A Scanned Copy of a reference latter"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>
  </div>
);

IntroConfiguration.propTypes = {
  addQuestionIntroChild: PropTypes.func.isRequired
};
