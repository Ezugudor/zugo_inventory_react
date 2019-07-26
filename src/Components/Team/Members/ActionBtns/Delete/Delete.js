import styles from "./Delete.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Delete = props => (
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
);

Delete.propTypes = {
  toggleCreateMember: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};
