import BaseStyle from "../Button.module.css";
import Style from "./White.module.css";
import React from "react";
const View = props => (
  <button className={`${BaseStyle.Button} ${Style.White}`} {...props}>
    {props.children}
  </button>
);

export const White = View;
