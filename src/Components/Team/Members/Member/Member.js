import trashcanImage from "../../../../img/trash-can.svg";
import penImage from "../../../../img/pen.svg";
import styles from "./Member.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Member = props => (
  <tr className={styles.member}>
    <td>{props.account.name}</td>
    <td>
      {props.account.role.charAt(0).toUpperCase() + props.account.role.slice(1)}
    </td>
    <td>{props.account.branch}</td>
    <td>
      <div className={styles.memberControls}>
        {/* <span className="branch__tooltip">Change Branch</span> */}
        <div
          onClick={() => props.setNewBranchDetail("user", props.account, true)}
          className={styles.iconHolder}
        >
          <img src={penImage} className={styles.icon} alt="Edit icon" />
        </div>
      </div>
      <div className={styles.memberControls}>
        {/* <span className="branch__tooltip">Delete</span> */}
        <div
          onClick={() => props.setMemberToDelete(props.account)}
          className={styles.iconHolder}
        >
          <img src={trashcanImage} className={styles.icon} alt="Delete icon" />
        </div>
      </div>
      <div className={styles.clearFix}></div>
    </td>
  </tr>
);

Member.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  setMemberToDelete: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired
};
