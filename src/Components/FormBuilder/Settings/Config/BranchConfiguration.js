import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React from "react";

export const BranchConfiguration = props => (
  <div className={Style.configuration}>
    <div className={Style.requiredRuleWrapper}>
      <span>State</span>
      <label className={Style.inputLabel}>
        <input
          disabled="disabled"
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addCompactQuestionChild({
              type: "dropdown",
              controlType: "state",
              name: "State",
              description: "Which state is the branch located?"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>

    <div className={Style.requiredRuleWrapper}>
      <span>Area / LGA</span>
      <label className={Style.inputLabel}>
        <input
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addCompactQuestionChild({
              type: "dropdown",
              name: "Area / LGA",
              description: "Branch Area / LGA",
              controlType: "lga"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>
    <div className={Style.requiredRuleWrapper}>
      <span>Branch Name</span>
      <label className={Style.inputLabel}>
        <input
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addCompactQuestionChild({
              type: "dropdown",
              controlType: "branch",
              name: "Branch Name",
              description: "Branches within the selected region"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>
  </div>
);

BranchConfiguration.propTypes = {
  addCompactQuestionChild: PropTypes.func.isRequired
};
