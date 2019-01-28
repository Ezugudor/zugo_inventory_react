import styles from "./TeamControls.module.css";
import { Red } from "../../Utils/Buttons";
import React from "react";

export const Controls = props => (
  <section className={styles.section}>
    <div className={styles.controls}>
      <Red>
        <span className={styles.controlIcon}>+</span>
        New Member
      </Red>
    </div>
  </section>
);
