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
    case "partiallyProcessed":
      const { partiallyProcessed } = props;
      return `${partiallyProcessed.count} of ${partiallyProcessed.count}`;

    case "processed":
      const { processed } = props;
      return `${processed.count} of ${processed.count}`;

    case "pending":
      const { pending } = props;
      return `${pending.count} of ${pending.count}`;

    default:
      return "0 of 0";
  }
};
InboxPagination.propTypes = {
  partiallyProcessed: PropTypes.object.isRequired,
  tabToShow: PropTypes.string.isRequired,
  processed: PropTypes.object.isRequired,
  pending: PropTypes.object.isRequired
};
