import Style from "./InboxHeader.module.css";
import React from "react";
export const InboxHeader = props => (
  <div className={Style.inboxHeader}>
    <div className={`${Style.inboxTab} ${Style.activeTab}`}>
      Unread
      <span className={`${Style.inboxTabIcon} ${Style.unreadIcon}`}>100</span>
    </div>
    <div className={Style.inboxTab}>
      Revisions
      <span className={`${Style.inboxTabIcon} ${Style.revisionIcon}`}>100</span>
    </div>
    <div className={Style.inboxTab}>Processed</div>
  </div>
);
