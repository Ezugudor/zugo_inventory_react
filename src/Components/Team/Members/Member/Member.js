import trashcanImage from "../../../../img/trash-can.svg";
import penImage from "../../../../img/pen.svg";
import styles from "./Member.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Member = props => (
  <div className={styles.member}>
    <div>{props.account.name}</div>
    <div>{props.account.role}</div>
    <div>{props.account.branch}</div>
    <div className={styles.memberControls}>
      <div className={styles.memberControl}>
        {/* <span className="member__tooltip">Change Branch</span> */}
        <div
          onClick={() => props.setNewBranchDetail("user", props.account, true)}
          className={styles.iconHolder}
        >
          <img src={penImage} className={styles.icon} alt="Edit icon" />
        </div>
      </div>
      <div className={styles.memberControl}>
        {/* <span className="member__tooltip">Delete</span> */}
        <div
          onClick={() => props.setMemberToDelete(props.account)}
          className={styles.iconHolder}
        >
          <img src={trashcanImage} className={styles.icon} alt="Delete icon" />
        </div>
      </div>
    </div>
  </div>
);

Member.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  setMemberToDelete: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired
};
