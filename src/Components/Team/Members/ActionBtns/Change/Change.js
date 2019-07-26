import styles from "./Change.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Change = props => (
  <div className={styles.memberControls}>
    {/* <span className="branch__tooltip">Change Branch</span> */}
    <div
      onClick={() => props.setNewBranchDetail("user", props.account, true)}
      className={styles.iconHolder}
    >
      <img src={props.penImage} className={styles.icon} alt="Edit icon" />
    </div>
  </div>
);

Change.propTypes = {
  toggleCreateMember: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};
