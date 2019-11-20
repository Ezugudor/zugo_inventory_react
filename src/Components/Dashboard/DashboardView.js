import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./DashboardView.module.css";
import { DashboardControls } from "./controls";
import PropTypes from "prop-types";
import { Inbox } from "./Inbox";
import { Notification, Loading } from "../Utils";
import React from "react";

export const DashboardView = props => {
  return (
    <AdminLayout pageName="dashboard" currentUser={props.currentUser}>
      <div className={Style.dashboard}>
        {/* <DashboardControls
        partiallyProcessed={props.partiallyProcessed}
        handleDateChange={props.handleDateChange}
        filterResponse={props.filterResponse}
        tabToShow={props.tabToShow}
        processed={props.processed}
        startDate={props.startDate}
        endDate={props.endDate}
        pending={props.pending}
      /> */}
        <Inbox
          partiallyProcessed={props.partiallyProcessed}
          tabToShow={props.tabToShow}
          switchTab={props.switchTab}
          processed={props.processed}
          pending={props.pending}
          handleDateChange={props.handleDateChange}
          filterResponse={props.filterResponse}
          startDate={props.startDate}
          endDate={props.endDate}
        />
        <Loading showLoading={props.showLoading} />
        <Notification
          title={"Default Title"}
          message={"Default Body Message"}
        />
      </div>
    </AdminLayout>
  );
};

DashboardView.propTypes = {
  partiallyProcessed: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  filterResponse: PropTypes.func.isRequired,
  processed: PropTypes.object.isRequired,
  startDate: PropTypes.string.isRequired,
  tabToShow: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  pending: PropTypes.object.isRequired
};
