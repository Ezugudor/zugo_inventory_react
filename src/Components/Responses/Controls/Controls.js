import { DatePicker } from '../../Utils';
import React from 'react';

export const Controls = props => (
  <div className="control">
    <div className="control__leftbox">
      <div className="control__textbox">
        <span>Responses (2)</span>
      </div>
    </div>
    <div className="control__rightbox">
      <div className="control__datepickerbox">
        <DatePicker />
      </div>
      <div className="control__searchbox">
        <input type="search" placeholder="Search Responses" />
      </div>
    </div>
  </div>
);
