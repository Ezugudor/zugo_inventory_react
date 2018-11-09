import BaseStyle from "../Button.module.css";
import Style from "./Red.module.css";
import React from "react";
const View = props => (
  <button className={`${BaseStyle.Button} ${Style.Red}`} {...props}>
    {props.children}
  </button>
);

export const Red = View;
