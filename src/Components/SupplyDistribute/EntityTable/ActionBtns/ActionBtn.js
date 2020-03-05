import styles from "./ActionBtn.module.css";
import PropTypes from "prop-types";
import React from "react";

const gotoSettings = (e, id) => {
  e.stopPropagation();
  return (window.location.href = `/business/settings/${id}`);
};

export const ActionBtns = props => (
  <div>
    <div className={styles.memberControls}>
      <div
        onClick={e => props.deleteTemporal(e, props.id)}
        className={styles.iconHolder}
      >
        <i className={`ion ion-ios-trash ${styles.icon} ${styles.red}`}></i>
      </div>
    </div>

    {/* <div className={styles.memberControls}>
      <div
        onClick={e => props.toggleEditEntity(e, props.id)}
        // onClick={e => props.populateEditBusiness(e, props.businessInfo)}
        className={styles.iconHolder}
      >
        <i className={`ion ion-ios-settings-strong ${styles.icon}`}></i>
      </div>
    </div> */}
    <div className={styles.clearfix}></div>
  </div>
);

ActionBtns.propTypes = {
  toggleCreateMember: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};
