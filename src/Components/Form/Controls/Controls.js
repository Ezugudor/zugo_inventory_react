import Style from "./Controls.module.css";
import React from "react";

const view = props => (
  <section className={Style.Controls}>
    <div className={Style.ControlBox}>
      <button className={Style.Button}>New Form</button>
      <span className={Style.Text}>
        Registion <strong>Forms</strong>
      </span>
      | <span>Individual</span>
    </div>
  </section>
);

export const Controls = view;
