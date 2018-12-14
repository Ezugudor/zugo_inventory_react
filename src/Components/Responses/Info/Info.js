import Style from "./Info.module.css";
import React from "react";

export const Info = props => (
  <div className={Style.info}>
    <span>
      <input className={Style.input} type="checkbox" />
    </span>
    <span> 2 Responses in total</span>
  </div>
);
