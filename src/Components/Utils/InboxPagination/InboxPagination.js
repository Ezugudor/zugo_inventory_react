import Style from "./InboxPagination.module.css";
import React from "react";

export const InboxPagination = props => (
  <div className={Style.pagination}>
    <p className={Style.paginationInfo}>1 - 25 of 1000</p>
    <div className={Style.paginationControls}>
      <span className={Style.paginationIcon}>&lt;</span>
      <span className={Style.paginationIcon}>&gt;</span>
    </div>
  </div>
);
