import Style from "./Control.module.css";

import React from "react";
export const Controls = props => (
  <section className={Style.Control}>
    <div className={Style.ControlBox}>
      <a className={`${Style.ControlText} ${Style.ControlTextActive} `}>
        Individual
      </a>
      <a className={Style.ControlText}>Corporate</a>
    </div>
  </section>
);
