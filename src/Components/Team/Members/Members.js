import styles from "./Members.module.css";
import { Member } from "./Member";
import React from "react";

export const Members = props => (
  <section className={styles.section}>
    <div className={styles.members}>
      <div className={styles.membersHead}>
        <div>Name</div>
        <div>User Role</div>
        <div>Current Branch</div>
        <div>Action</div>
      </div>
      <Member />
    </div>
  </section>
);
