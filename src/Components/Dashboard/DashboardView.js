import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./DashboardView.module.css";
import { DashboardControls } from "./controls";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Inbox } from "./Inbox";

export class DashboardView extends Component {
  state = {
    responseToShow: "pending"
  };

  switchResponseType = e => {
    const content = e.target.textContent.replace(/\d/g, "").toLowerCase();
    this.setState({ responseToShow: content });
  };

  render() {
    return (
      <AdminLayout pageName="dashboard">
        <div className={Style.dashboard}>
          <DashboardControls
            handleDateChange={this.props.handleDateChange}
            filterResponse={this.props.filterResponse}
            tabToShow={this.state.responseToShow}
            processed={this.props.processed}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            pending={this.props.pending}
          />
          <Inbox
            tabToShow={this.state.responseToShow}
            switchTab={this.switchResponseType}
            processed={this.props.processed}
            pending={this.props.pending}
          />
        </div>
      </AdminLayout>
    );
  }
}

DashboardView.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  filterResponse: PropTypes.func.isRequired,
  processed: PropTypes.object.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  pending: PropTypes.object.isRequired
};
