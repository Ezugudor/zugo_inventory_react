import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./DashboardView.module.css";
import { DashboardControls } from "./controls";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Inbox } from "./Inbox";

export class DashboardView extends Component {
  state = {
    responseToShow: "unread"
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
            tabToShow={this.state.responseToShow}
            {...this.props}
          />
          <Inbox
            tabToShow={this.state.responseToShow}
            switchTab={this.switchResponseType}
            {...this.props}
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
  unread: PropTypes.object.isRequired
};
