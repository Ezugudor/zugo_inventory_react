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
        className={buildStyle(props, "individual")}
        onClick={props.switchTab}
      >
        Individual
      </div>
      <div className={buildStyle(props, "corporate")} onClick={props.switchTab}>
        Corporate
      </div>
    </div>
  </section>
);

FormTypesControls.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};
