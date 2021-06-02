import styles from "./ActionBtn.module.css";
import PropTypes from "prop-types";
import React from "react";

export const ActionBtns = props => (
  <div>
    <div className={styles.memberControls}>
      {/* <span className="branch__tooltip">Delete</span> */}
      <div className={styles.branchControls}>
        {/* <span className="branch__tooltip">Change Branch</span> */}
        <div
          onClick={() => props.setBranchToChange(props.branch)}
          className={styles.iconHolder}
        >
          {/* <img src={penImage} className={styles.icon} alt="Edit icon" /> */}
          <i className={`ion ion-edit ${styles.icon} `}></i>
        </div>
      </div>
      <div className={styles.branchControls}>
        {/* <span className="branch__tooltip">Delete</span> */}
        <div
          onClick={() => props.setBranchToDelete(props.branch)}
          className={styles.iconHolder}
        >
          {/* <img src={trashcanImage} className={styles.icon} alt="Delete icon" /> */}
          <i className={`ion ion-ios-trash ${styles.icon} ${styles.red}`}></i>
        </div>
      </div>
      <div className={styles.clearFix}></div>
    </div>
  </div>
);

ActionBtns.propTypes = {
  toggleCreateMember: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};
