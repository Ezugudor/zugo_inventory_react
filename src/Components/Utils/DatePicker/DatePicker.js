import Style from "./DatePicker.module.css";
import { Red } from "../Buttons";

import React from "react";

export const DatePicker = props => (
  <div className={Style.datePicker}>
    <div className={Style.dateGroup}>
      <input type="date" className={Style.dateInput} />
    </div>
    <div className={Style.dateGroup}>
      <input type="date" className={Style.dateInput} />
    </div>
    <div className={Style.dateGroup}>
      <Red styles={Style.button}>
        <i className="fas fa-filter" />
        Fiter
      </Red>
    </div>
  </div>
);
