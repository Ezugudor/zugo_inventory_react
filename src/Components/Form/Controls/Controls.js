import Style from "./Controls.module.css";
import { Red } from "../../Utils/Buttons";
import PropTypes from "prop-types";
import React from "react";

const view = props => (
  <section className={Style.Controls}>
    <div className={Style.ControlBox}>
      <Red onClick={props.toggleNewForm}>New Form</Red>
      <span className={Style.Text}>
        Registion <strong>Forms </strong>
      </span>
      | <span>Individual</span>
    </div>
  </section>
);

view.propTypes = {
  toggleNewForm: PropTypes.func.isRequired
};

export const Controls = view;
