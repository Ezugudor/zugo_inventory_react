import Style from "./Control.module.css";

import React from "react";
export const Controls = props => (
  <section className={Style.Control}>
    <div className={Style.ControlBox}>
      <a
        className={`${Style.ControlText} ${Style.ControlTextActive}`}
        href="#d"
      >
        Individual
      </a>
      <a className={Style.ControlText} href="#d">
        Corporate
      </a>
    </div>
  </section>
);
