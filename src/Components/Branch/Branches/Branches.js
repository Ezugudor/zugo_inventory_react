import styles from "./Branches.module.css";
import PropTypes from "prop-types";
import { Branch } from "./Branch";
import React from "react";

export const Branches = props => (
  <section className={styles.section}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>State</th>
          <th>Area(LGA)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.branches.map(branch =>
          branch.deleted !== true ? (
            <Branch
              setNewBranchDetail={props.setNewBranchDetail}
              setBranchToDelete={props.setBranchToDelete}
              key={branch.name}
              branch={branch}
            />
          ) : (
            ""
          )
        )}
      </tbody>
    </table>
  </section>
);

Branches.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  setBranchToDelete: PropTypes.func.isRequired,
  branch: PropTypes.array.isRequired
};
