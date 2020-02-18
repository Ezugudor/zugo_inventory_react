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
      className={`${buildStyle(props, "all")} ${Style.firstTab}`}
      onClick={() => props.switchTab("all")}
    >
      <div className={Style.tabContent}>
        All Business
        <span className={`${Style.inboxTabIcon} ${Style.unreadIcon}`}>
          {props.allBusinessCount}
        </span>
      </div>
      <div className={Style.shape}></div>
    </div>
    <div
      className={`${buildStyle(props, "approved")} ${Style.secondTab}`}
      onClick={() => props.switchTab("approved")}
    >
      <div className={Style.tabContent}>
        Subscribed
        <span className={`${Style.inboxTabIcon} ${Style.unreadIcon}`}>
          {props.approvedBusinessCount}
        </span>
      </div>
      <div className={`${Style.shape} ${Style.shape2ndTab}`}></div>
    </div>
    <div
      className={`${buildStyle(props, "inactive")} ${Style.thirdTab}`}
      onClick={() => props.switchTab("inactive")}
    >
      <div className={Style.tabContent}>
        Inactive Business
        <span className={`${Style.inboxTabIcon} ${Style.unreadIcon}`}>
          {props.inactiveBusinessCount}
        </span>
      </div>
      <div className={`${Style.shape} ${Style.shape3rdTab}`}></div>
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
