import Style from "./Customers.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const buildStyle = (props, tab) => {
  const conditionalStyle = {};
  conditionalStyle[Style.activeTab] = props.selectedTab === tab;
  return className(Style.inboxTab, conditionalStyle);
};

export const Customers = props => (
  <div class="col2">
    <a href="customers" className={Style.CardBody}>
      <span className={`mdi mdi-account-group ${Style.CardIcon}`}></span>
      <div className={Style.CardInfo}>
        <span className={Style.CardHeader}>Customers</span>
        <span className={Style.Bold}>
          {props.customers ? props.customers.length : 0}
        </span>
      </div>
    </a>
  </div>
);

Customers.propTypes = {
  partiallyProcessedCount: PropTypes.number.isRequired,
  processedCount: PropTypes.number.isRequired,
  pendingCount: PropTypes.number.isRequired,
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};
