import Style from "./Payments.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const buildStyle = (props, tab) => {
  const conditionalStyle = {};
  conditionalStyle[Style.activeTab] = props.selectedTab === tab;
  return className(Style.inboxTab, conditionalStyle);
};

export const Payments = props => (
  <div class="col2">
    <a href="payment" className={Style.CardBody}>
      <span className={`mdi mdi-cash-register ${Style.CardIcon}`}></span>
      <div className={Style.CardInfo}>
        <span className={Style.CardHeader}>Today Payment</span>
        <span className={Style.SubInfo}>
          Total: <span className={Style.Bold}>3</span>
        </span>
        <span className={Style.SubInfo}>
          Amount: <span className={Style.Bold}>N300,000</span>
        </span>
      </div>
    </a>
  </div>
);

Payments.propTypes = {
  partiallyProcessedCount: PropTypes.number.isRequired,
  processedCount: PropTypes.number.isRequired,
  pendingCount: PropTypes.number.isRequired,
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};
