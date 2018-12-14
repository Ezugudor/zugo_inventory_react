import Style from "./InboxPagination.module.css";
import PropTypes from "prop-types";
import React from "react";

export const InboxPagination = props => (
  <div className={Style.pagination}>
    <p className={Style.paginationInfo}>{getInfo(props)}</p>
    <div className={Style.paginationControls}>
      <span className={Style.paginationIcon}>&lt;</span>
      <span className={Style.paginationIcon}>&gt;</span>
    </div>
  </div>
);

const getInfo = props => {
  switch (props.tabToShow) {
    case "processed":
      const { processed } = props;
      return `1 - ${processed.count} of ${processed.count}`;
    case "unread":
      const { unread } = props;
      return `1 - ${unread.count} of ${unread.count}`;
    default:
      return "0 of 0";
  }
};
InboxPagination.propTypes = {
  tabToShow: PropTypes.string.isRequired
};
