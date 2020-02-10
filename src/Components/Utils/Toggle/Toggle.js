import Style from "./Toggle.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Toggle = props => (
  <div className={Style.toggleWrapper}>
    <span className={Style.label}>{props.label}</span>
    <label
      className={Style.inputLabel}
      htmlFor={`toggleE_${props.group}_${props.keyy}`}
      onClick={e => e.stopPropagation()}
    >
      <input
        type="checkbox"
        id={`toggleE_${props.group}_${props.keyy}`}
        className={Style.input}
        onChange={e => {
          if (typeof props.trigger !== "undefined")
            props.trigger(e, props.active, props.id);
        }}
        // onClick={e => {
        //   if (typeof props.toggleBtnClicked !== "undefined")
        //     props.trigger(e, props.active);
        // }}
        checked={props.active}
      />
      <span className={Style.toggleButton} />
    </label>
  </div>
);
