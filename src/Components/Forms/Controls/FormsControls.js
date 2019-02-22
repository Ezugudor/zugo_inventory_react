import Style from "./FormsControls.module.css";
import { Red } from "../../Utils/Buttons";
import PropTypes from "prop-types";
import React from "react";

export const FormsControls = props => (
  <section className={Style.Controls}>
    <div className={Style.ControlBox}>
      <Red click={props.toggleNewForm}>Create A New Form</Red>
      <span className={Style.Text}>
        {props.formType.name} <strong>Forms </strong>
      </span>{" "}
      | <span className={Style.Text}> {props.formType.parent}</span>
    </div>
  </section>
);

FormsControls.propTypes = {
  toggleNewForm: PropTypes.func.isRequired,
  formType: PropTypes.object.isRequired
};
