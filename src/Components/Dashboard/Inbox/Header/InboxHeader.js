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
    <div className={buildStyle(props, "unread")} onClick={props.switchTab}>
      Unread
      <span className={`${Style.inboxTabIcon} ${Style.unreadIcon}`}>
        {props.unreadCount}
      </span>
    </div>
    <div className={buildStyle(props, "revisions")} onClick={props.switchTab}>
      Revisions
      <span className={`${Style.inboxTabIcon} ${Style.revisionIcon}`}>0</span>
    </div>
    <div className={buildStyle(props, "processed")} onClick={props.switchTab}>
      Processed
    </div>
  </div>
);

InboxHeader.propTypes = {
  unreadCount: PropTypes.number.isRequired,
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};
