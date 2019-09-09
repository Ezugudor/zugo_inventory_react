import Style from "./FormTypesControl.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const buildStyle = (props, tab) => {
  const conditionalStyle = {};
  conditionalStyle[Style.controlTextActive] = props.selectedTab === tab;
  return className(Style.controlText, conditionalStyle);
};

export const FormTypesControls = props => (
  <section className={Style.control}>
    <div className={Style.controlBox}>
      <div
        className={`${buildStyle(props, "individual")} ${Style.firstTab}`}
        onClick={() => props.switchTab("individual")}
      >
        <div className={Style.tabContent}>Personal Account Forms</div>
        <div className={`${Style.shape}`}></div>
      </div>
      <div
        className={`${buildStyle(props, "corporate")} ${Style.secondTab}`}
        onClick={() => props.switchTab("corporate")}
      >
        <div className={Style.tabContent}>Corporate Account Forms</div>
        <div className={`${Style.shape} ${Style.shape2ndTab}`}></div>
      </div>
    </div>
  </section>
);

FormTypesControls.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};
