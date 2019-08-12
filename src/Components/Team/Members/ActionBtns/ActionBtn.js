import styles from "./ActionBtn.module.css";
import PropTypes from "prop-types";
import React from "react";

export const ActionBtns = props => (
  <div>
    <div className={styles.memberControls}>
      {/* <span className="branch__tooltip">Delete</span> */}
      <div
        onClick={() => props.setMemberToDelete(props.account)}
        className={styles.iconHolder}
      >
        <img
          src={props.trashcanImage}
          className={styles.icon}
          alt="Delete icon"
        />
      </div>
    </div>

    <div className={styles.memberControls}>
      {/* <span className="branch__tooltip">Change Branch</span> */}
      <div
        onClick={() => props.setMemberDetail("user", props.account, true)}
        className={styles.iconHolder}
      >
        <img src={props.penImage} className={styles.icon} alt="Edit icon" />
      </div>
    </div>
  </div>
);

ActionBtns.propTypes = {
  toggleCreateMember: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};
