import Style from "./ItemConfiguration.module.css";
import PropTypes from "prop-types";
import React from "react";

export const AddressConfiguration = props => (
  <div className={Style.configuration}>
    <div className={Style.requiredRuleWrapper}>
      <span>House No</span>
      <label className={Style.inputLabel}>
        <input
          disabled="disabled"
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addCompactQuestionChild({
              type: "text",
              name: "House No",
              description: "Your house number"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>
    <div className={Style.requiredRuleWrapper}>
      <span>Street Name</span>
      <label className={Style.inputLabel}>
        <input
          disabled="disabled"
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addCompactQuestionChild({
              type: "text",
              name: "Street Name",
              description: "Your street name"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>

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
              description: "which state is your address"
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
          disabled="disabled"
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addCompactQuestionChild({
              type: "dropdown",
              controlType: "lga",
              name: "Area / LGA",
              description: "Address Area / LGA"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>

    <div className={Style.requiredRuleWrapper}>
      <span>House Name</span>
      <label className={Style.inputLabel}>
        <input
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addCompactQuestionChild({
              type: "shorttext",
              name: "House Name",
              description: "House's popular name (if any)"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>

    <div className={Style.requiredRuleWrapper}>
      <span>Landmark / Direction</span>
      <label className={Style.inputLabel}>
        <input
          type="checkbox"
          id="required"
          className={Style.input}
          onChange={() =>
            props.addCompactQuestionChild({
              type: "longtext",
              name: "Landmark / Direction",
              description: "How can one get to this place?"
            })
          }
        />
        <span htmlFor="required" className={Style.toggleButton} />
      </label>
    </div>
  </div>
);

AddressConfiguration.propTypes = {
  addCompactQuestionChild: PropTypes.func.isRequired
};
