import Style from "./ResponsesControl.module.css";
import { DatePicker } from "../../Utils";
import React from "react";

export const ResponsesControls = props => (
  <section className={Style.controlSection}>
    <div className={Style.info}>
      <h1 className={Style.primaryHeading}>
        Account Opening - #98da8da9e9dd9d
      </h1>
      <h2 className={Style.secondaryHeading}>Responses (2)</h2>
    </div>
    <div>
      <DatePicker />
    </div>
  </section>
);
