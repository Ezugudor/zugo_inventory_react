import Style from "./Toggle.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Toggle = props => (
  <div className={Style.toggleWrapper}>
    <span className={Style.label}>{props.label}</span>
    <label className={Style.inputLabel} htmlFor="toggleE">
      <input
        type="checkbox"
        id="toggleE"
        className={Style.input}
        onChange={e => {
          if (typeof props.trigger !== "undefined") props.trigger(e);
        }}
        onClick={e => {
          if (typeof props.toggleBtnClicked !== "undefined")
            props.toggleBtnClicked(e);
        }}
        checked={props.active}
      />
      <span className={Style.toggleButton} />
    </label>
  </div>
);
