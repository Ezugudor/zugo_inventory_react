import React from "react";
export const DatePicker = props => (
  <div className="swyp-date-picker">
    <div className="swyp-date-picker__group">
      <input type="date" className="swyp-date-picker__input" id="start_date" placeholder="Start date"></input>
      <label className="wyp-date-picker__label" htmlFor="start_date"></label>
    </div>
    <div className="swyp-date-picker__group">
      <input type="date" className="swyp-date-picker__input" id="end_date" placeholder="Start date"></input>
      <label className="wyp-date-picker__label" htmlFor="end_date"></label>
    </div>
    <div className="swyp-date-picker__group">
      <button className="swyp-date-picker__button">
        <span className="swyp-date-picker__icon"></span>
        Fiter
      </button>
    </div>
  </div>
)