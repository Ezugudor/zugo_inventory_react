import styles from "./Members.module.css";
import PropTypes from "prop-types";
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
      {props.members.map(account => (
        <Member
          setNewBranchDetail={props.setNewBranchDetail}
          setMemberToDelete={props.setMemberToDelete}
          key={account.email}
          account={account}
        />
      ))}
    </div>
  </section>
);

Members.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  setMemberToDelete: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired
};
