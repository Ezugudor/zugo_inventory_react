import BaseStyle from "../Button.module.css";
import Style from "./WhiteSimple.module.css";
import PropTypes from "prop-types";
import React from "react";
export const WhiteSimple = props => (
  <button
    className={`${BaseStyle.Button} ${Style.White}`}
    onClick={props.click}
  >
    {props.children}
  </button>
);

WhiteSimple.propTypes = {
  click: PropTypes.func.isRequired
};
