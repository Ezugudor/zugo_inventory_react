import Style from "./Outlets.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const buildStyle = (props, tab) => {
  const conditionalStyle = {};
  conditionalStyle[Style.activeTab] = props.selectedTab === tab;
  return className(Style.inboxTab, conditionalStyle);
};

export const Outlets = props => (
  <div class="col2">
    <a href="outlets" className={Style.CardBody}>
      <span className={`mdi mdi-store ${Style.CardIcon}`}></span>
      <div className={Style.CardInfo}>
        <span className={Style.CardHeader}>Outlets</span>
        <span className={Style.SubInfo}>
          No of Debtors: <span className={Style.Bold}>20</span>
        </span>
        <span className={Style.SubInfo}>
          Trans Amount: <span className={Style.Bold}>N50,000</span>
        </span>
      </div>
    </a>
  </div>
);

Outlets.propTypes = {
  partiallyProcessedCount: PropTypes.number.isRequired,
  processedCount: PropTypes.number.isRequired,
  pendingCount: PropTypes.number.isRequired,
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};
