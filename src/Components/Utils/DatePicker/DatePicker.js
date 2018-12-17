import Style from "./DatePicker.module.css";
import PropTypes from "prop-types";
import { Red } from "../Buttons";
import React from "react";

export const DatePicker = props => (
  <div className={Style.datePicker}>
    <div className={Style.dateGroup}>
      <input
        onInput={props.handleDateChange}
        className={Style.dateInput}
        data-date-type="startDate"
        type="date"
      />
    </div>
    <div className={Style.dateGroup}>
      <input
        onChange={props.handleDateChange}
        className={Style.dateInput}
        data-date-type="endDate"
        type="date"
      />
    </div>
    <div className={Style.dateGroup}>
      <Red styles={Style.button} click={props.filterResponse}>
        <i className="fas fa-filter" />
        Fiter
      </Red>
    </div>
  </div>
);

DatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  filterResponse: PropTypes.func.isRequired
};
