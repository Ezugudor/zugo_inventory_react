import Style from "./Backdrop.module.css";
import PropTypes from "prop-types";
import React from "react";
const View = props =>
  props.show ? <div className={Style.Backdrop} onClick={props.click} /> : null;

View.propType = {
  show: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired
};
export const BackDrop = View;
