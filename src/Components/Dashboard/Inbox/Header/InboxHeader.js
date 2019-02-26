import Style from "./InboxHeader.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const buildStyle = (props, tab) => {
  const conditionalStyle = {};
  conditionalStyle[Style.activeTab] = props.selectedTab === tab;
  return className(Style.inboxTab, conditionalStyle);
};

export const InboxHeader = props => (
  <div className={Style.inboxHeader}>
    <div
      className={buildStyle(props, "pending")}
      onClick={() => props.switchTab("pending")}
    >
      Pending for Initiators
      <span className={`${Style.inboxTabIcon} ${Style.unreadIcon}`}>
        {props.pendingCount}
      </span>
    </div>
    <div
      className={buildStyle(props, "partiallyProcessed")}
      onClick={() => props.switchTab("partiallyProcessed")}
    >
      Pending for Approvers
      <span className={`${Style.inboxTabIcon} ${Style.unreadIcon}`}>
        {props.partiallyProcessedCount}
      </span>
    </div>
    <div
      className={buildStyle(props, "processed")}
      onClick={() => props.switchTab("processed")}
    >
      Processed
      <span className={`${Style.inboxTabIcon} ${Style.unreadIcon}`}>
        {props.processedCount}
      </span>
    </div>
  </div>
);

InboxHeader.propTypes = {
  partiallyProcessedCount: PropTypes.number.isRequired,
  processedCount: PropTypes.number.isRequired,
  pendingCount: PropTypes.number.isRequired,
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};
