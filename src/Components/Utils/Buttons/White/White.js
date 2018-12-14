import BaseStyle from "../Button.module.css";
import Style from "./White.module.css";
import PropTypes from "prop-types";
import React from "react";
export const White = props => (
  <button
    className={`${BaseStyle.Button} ${Style.White}`}
    onClick={props.handleClick}
  >
    {props.children}
  </button>
);

White.propTypes = {
  handleClick: PropTypes.func.isRequired
};
