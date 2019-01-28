import trashcanImage from "../../../../img/trash-can.svg";
import penImage from "../../../../img/pen.svg";
import styles from "./Member.module.css";
import React from "react";

export const Member = props => (
  <div className={styles.member}>
    <div>Ossaija Thankgod</div>
    <div>Admin</div>
    <div>Apapa</div>
    <div className={styles.memberControls}>
      <div className={styles.memberControl}>
        {/* <span className="member__tooltip">Change Branch</span> */}
        <div className={styles.iconHolder}>
          <img src={penImage} className={styles.icon} alt="Edit icon" />
        </div>
      </div>
      <div className={styles.memberControl}>
        {/* <span className="member__tooltip">Delete</span> */}
        <div className={styles.iconHolder}>
          <img src={trashcanImage} className={styles.icon} alt="Delete icon" />
        </div>
      </div>
    </div>
  </div>
);
