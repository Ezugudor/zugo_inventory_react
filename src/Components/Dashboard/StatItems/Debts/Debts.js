import Style from "./Debts.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const buildStyle = (props, tab) => {
  const conditionalStyle = {};
  conditionalStyle[Style.activeTab] = props.selectedTab === tab;
  return className(Style.inboxTab, conditionalStyle);
};

const totalDept = props => {
  let totalDept = 0;
  props.outlets.forEach(outlet => {
    const { credits } = outlet;
    credits.forEach(cred => {
      totalDept++;
    });
  });
  return totalDept;
};

const totalDeptAmount = props => {
  let totalDeptAmount = 0;
  props.outlets.forEach(outlet => {
    const { credits } = outlet;
    credits.forEach(cred => {
      totalDeptAmount += cred.total_amount;
    });
  });
  return totalDeptAmount;
};

export const Debts = props => (
  <div class="col2">
    <a href="creditsum" className={Style.CardBody}>
      <span className={`mdi mdi-cash-refund ${Style.CardIcon}`}></span>
      <div className={Style.CardInfo}>
        <span className={Style.CardHeader}>Pending Debts</span>
        <span className={Style.SubInfo}>
          No of Debtors: <span className={Style.Bold}>{totalDept(props)}</span>
        </span>
        <span className={Style.SubInfo}>
          Total Amount:{" "}
          <span className={`${Style.Bold} naira`}>
            {totalDeptAmount(props)}
          </span>
        </span>
      </div>
    </a>
  </div>
);

Debts.propTypes = {
  partiallyProcessedCount: PropTypes.number.isRequired,
  processedCount: PropTypes.number.isRequired,
  pendingCount: PropTypes.number.isRequired,
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};
