import { DatePicker, InboxPagination } from "../../Utils";
import Style from "./DashboardControls.module.css";
import PropTypes from "prop-types";
import React from "react";

export const DashboardControls = props => (
  <section className={Style.controls}>
    <DatePicker
      handleDateChange={props.handleDateChange}
      filterResponse={props.filterResponse}
    />
    <InboxPagination {...props} />
  </section>
);

DashboardControls.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  filterResponse: PropTypes.func.isRequired,
  processed: PropTypes.object.isRequired,
  tabToShow: PropTypes.string.isRequired,
  unread: PropTypes.object.isRequired
};
