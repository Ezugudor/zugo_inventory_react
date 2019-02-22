import Style from "./DatePicker.module.css";
import PropTypes from "prop-types";
import { Red } from "../Buttons";
import React from "react";

export const DatePicker = props => (
  <div className={Style.datePicker}>
    <div className={Style.dateGroup}>
      <input
        onChange={props.handleDateChange}
        className={Style.dateInput}
        data-date-type="startDate"
        value={props.startDate}
        type="date"
      />
    </div>
    <div className={Style.dateGroup}>
      <input
        onChange={props.handleDateChange}
        className={Style.dateInput}
        data-date-type="endDate"
        value={props.endDate}
        type="date"
      />
    </div>
    <div className={Style.dateGroup}>
      <Red styles={Style.button} click={props.filterResponse}>
        <i className="fas fa-filter" />
        Filter
      </Red>
    </div>
  </div>
);

DatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  filterResponse: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};
