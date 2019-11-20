import Style from "./DatePicker.module.css";
import PropTypes from "prop-types";
import { WhiteSimple } from "../Buttons";
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
        placeholder="Begining"
      />
    </div>
    <div className={Style.dateGroup}>
      <input
        onChange={props.handleDateChange}
        className={Style.dateInput}
        data-date-type="endDate"
        value={props.endDate}
        type="date"
        placeholder="Today"
      />
    </div>
    <div className={Style.dateGroup}>
      <WhiteSimple styles={Style.button} click={props.filterResponse}>
        <i className={`${Style.filterIcon} ion ion-ios-search-strong`} />
        <span className={Style.filterText}>Filter</span>
      </WhiteSimple>
    </div>
  </div>
);

DatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  filterResponse: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};
