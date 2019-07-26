import styles from "./Members.module.css";
import PropTypes from "prop-types";
import { Member } from "./Member";
import React from "react";

export const Members = props => (
  <section className={styles.section}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>User Role</th>
          <th>Current Branch</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.members.map(account => (
          <Member
            setNewBranchDetail={props.setNewBranchDetail}
            setMemberToDelete={props.setMemberToDelete}
            key={account.email}
            account={account}
          />
        ))}
      </tbody>
    </table>
  </section>
);

Members.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  setMemberToDelete: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired
};
