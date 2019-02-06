import BaseStyle from "../Button.module.css";
import Style from "./Red.module.css";
import PropTypes from "prop-types";
import ClassName from "classnames";
import React from "react";

const getStyle = props => {
  const conditionalStyles = {};
  conditionalStyles[BaseStyle.Button] = !props.styles;
  conditionalStyles[props.styles] = props.styles;
  return ClassName(Style.red, conditionalStyles);
};
export const Red = props => (
  <button
    className={getStyle(props)}
    disabled={props.disabled}
    onClick={props.click}
  >
    {props.children}
  </button>
);

Red.propTypes = {
  click: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
