import trashcanImage from "../../../../img/trash-can.svg";
import penImage from "../../../../img/pen.svg";
import styles from "./Branch.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Branch = props => (
  <tr className={styles.branch}>
    <td>{props.branch.name}</td>
    <td>{props.branch.address}</td>
    <td>{props.branch.state}</td>
    <td>{props.branch.area}</td>
    <td>
      <div className={styles.branchControls}>
        {/* <span className="branch__tooltip">Change Branch</span> */}
        <div
          onClick={() => props.setNewBranchDetail("user", props.branch, true)}
          className={styles.iconHolder}
        >
          <img src={penImage} className={styles.icon} alt="Edit icon" />
        </div>
      </div>
      <div className={styles.branchControls}>
        {/* <span className="branch__tooltip">Delete</span> */}
        <div
          onClick={() => props.setBranchToDelete(props.branch)}
          className={styles.iconHolder}
        >
          <img src={trashcanImage} className={styles.icon} alt="Delete icon" />
        </div>
      </div>
      <div className={styles.clearFix}></div>
    </td>
  </tr>
);

Branch.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  setBranchToDelete: PropTypes.func.isRequired,
  branch: PropTypes.object.isRequired
};
