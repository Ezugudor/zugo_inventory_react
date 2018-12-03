import React from "react";

export const InboxPagination = props => (
  <div className="pagination">
    <p className="pagination__page-info">1 - 25 of 1000</p>
    <div className="pagination__links">
      <a className="pagination__link" href="#d">
        <span className="pagination_icon">&lt;</span>
      </a>
      <a className="pagination__link" href="#d">
        <span className="pagination_icon">&gt;</span>
      </a>
    </div>
  </div>
);
