import Style from "./Outlets.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const buildStyle = (props, tab) => {
  const conditionalStyle = {};
  conditionalStyle[Style.activeTab] = props.selectedTab === tab;
  return className(Style.inboxTab, conditionalStyle);
};

const totalTrans = props => {
  let totalTrans = 0;
  props.outlets.forEach(outlet => {
    const { sales } = outlet;
    totalTrans += sales.length;
  });
  return totalTrans;
};

const totalTransAmount = props => {
  let totalTransAmount = 0;
  props.outlets.forEach(outlet => {
    const { sales } = outlet;
    sales.forEach(cred => {
      totalTransAmount += cred.total_price || 0;
    });
  });
  return totalTransAmount;
};

export const Outlets = props => (
  <div class="col2">
    <a href="outlets" className={Style.CardBody}>
      <span className={`mdi mdi-store ${Style.CardIcon}`}></span>
      <div className={Style.CardInfo}>
        <span className={Style.CardHeader}>Outlets Sales:</span>
        <span className={Style.SubInfo}>
          No of Trans: <span className={Style.Bold}>{totalTrans(props)}</span>
        </span>
        <span className={Style.SubInfo}>
          Trans Amount:{" "}
          <span className={`${Style.Bold} naira`}>
            {totalTransAmount(props)}
          </span>
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
