import styles from "./TeamControls.module.css";
import { Red } from "../../Utils/Buttons";
import PropTypes from "prop-types";
import React from "react";

export const Controls = props => (
  <section className={styles.section}>
    <div className={styles.controls}>
      <Red
        disabled={props.currentUser.role !== "admin" ? true : false}
        click={props.toggleCreateMember}
      >
        <span className={styles.controlIcon}>+</span>
        New Member
      </Red>
    </div>
  </section>
);

Controls.propTypes = {
  toggleCreateMember: PropTypes.func.isRequired
};
