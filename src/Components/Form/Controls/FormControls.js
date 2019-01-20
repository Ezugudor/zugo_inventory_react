import Style from "./FormControls.module.css";
import { Red } from "../../Utils/Buttons";
import PropTypes from "prop-types";
import React from "react";

export const FormControls = props => (
  <section className={Style.Controls}>
    <div className={Style.ControlBox}>
      <Red click={props.toggleNewForm}>New Form</Red>
      <span className={Style.Text}>
        Registion <strong>Forms </strong>
      </span>
      | <span>Individual</span>
    </div>
  </section>
);

FormControls.propTypes = {
  toggleNewForm: PropTypes.func.isRequired
};