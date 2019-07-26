import { White, Red } from "../../../Utils/Buttons";
import styles from "./ChangeBranch.module.css";
import { Modal } from "../../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const ChangeBranch = props => (
  <Modal show={props.showChangeBranch} click={props.toggleChangeBranch}>
    <section className={styles.section}>
      <h3 className={styles.text}>Change Branch</h3>
      <div className={styles.inputBox}>
        <select
          onChange={e => props.setNewBranchDetail("branch", e.target.value)}
          className={styles.input}
          id="branch"
        >
          <option>Select Branch</option>
          {props.branches.map(branch => (
            <option value={branch.name} key={branch.name}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.controls}>
        <White click={props.toggleChangeBranch}>Cancel</White>
        <Red click={props.changeBranch}>Change Branch</Red>
      </div>
    </section>
  </Modal>
);

ChangeBranch.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  toggleChangeBranch: PropTypes.func.isRequired,
  showChangeBranch: PropTypes.bool.isRequired,
  changeBranch: PropTypes.func.isRequired,
  branches: PropTypes.array.isRequired
};
