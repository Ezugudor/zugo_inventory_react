import Style from "./FormsControls.module.css";
import { Red } from "../../Utils/Buttons";
import PropTypes from "prop-types";
import React from "react";

export const FormsControls = props => (
  <section className={Style.Controls}>
    <div className={Style.ControlBox}>
      <i className={`${Style.titleIcon} ion ion-ios-list-outline`}></i>
      <div className={Style.info}>
        <span className={Style.Text}>Showing forms for :</span>
        <span className={`${Style.Text} ${Style.parent}`}>
          {props.formType.parent}
        </span>

        <i className={`${Style.arrow} ion ion-ios-arrow-right`}></i>

        <span className={`${Style.Text} ${Style.name}`}>
          {props.formType.name}
        </span>
      </div>
      {/* <span className={Style.Text}>Forms </span> */}
      <div className={Style.newBtn}>
        <Red click={props.toggleNewForm}>
          <i className={`${Style.newBtnIcon} ion ion-ios-plus`}></i>
          <span className={Style.newBtnText}>Create A New Form</span>
        </Red>
      </div>
      <div className={Style.clearfix}></div>
    </div>
  </section>
);

FormsControls.propTypes = {
  toggleNewForm: PropTypes.func.isRequired,
  formType: PropTypes.object.isRequired
};
