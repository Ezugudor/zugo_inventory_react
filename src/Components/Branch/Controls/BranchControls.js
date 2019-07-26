import styles from "./BranchControls.module.css";
import { Red } from "../../Utils/Buttons";
import PropTypes from "prop-types";
import React from "react";

export const Controls = props => (
  <section className={styles.section}>
    <div className={styles.controls}>
      <Red
        disabled={props.currentUser.role !== "admin" ? true : false}
        click={props.toggleCreateBranch}
      >
        <span className={styles.controlIcon}>+</span>
        New Branch
      </Red>
    </div>
  </section>
);

Controls.propTypes = {
  toggleCreateBranch: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};
