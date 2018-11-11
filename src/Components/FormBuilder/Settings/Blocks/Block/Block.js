import Style from "./Block.module.css";
import React from "react";
const view = props => (
  <div className={Style.Block}>
    <div className={`${Style.IconBox} ${Style[props.type]}`}>
      <div className={Style.IconHolder}>
        <img
          className={Style.Icon}
          src={`/img/${props.type}.svg`}
          alt={props.type}
        />
      </div>
    </div>
    <span className={Style.Text}>{props.name}</span>
  </div>
);

export const Block = view;
