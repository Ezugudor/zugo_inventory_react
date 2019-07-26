import { White, Red } from "../../../Utils/Buttons";
import styles from "./NewBranch.module.css";
import { Modal } from "../../../Utils";
import { countryStates } from "../../../../utils";
import PropTypes from "prop-types";
import React from "react";

export const NewBranch = props => (
  <Modal show={props.showCreateBranch} click={props.toggleCreateBranch}>
    <section className={styles.section}>
      <h3 className={styles.text}>New Branch</h3>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewBranchDetail([{ name: e.target.value }])}
          className={styles.input}
          placeholder="Name"
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <select
          id="role"
          className={styles.input}
          onChange={e => props.setSelectedLGA(e.target.value)}
        >
          <option>Select State</option>
          {countryStates.map(state => (
            <option value={state.state.id} key={state.state.name}>
              {state.state.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputBox}>
        <select
          className={styles.input}
          id="branch"
          onChange={e => props.setNewBranchDetail([{ area: e.target.value }])}
        >
          <option>Select Area</option>
          {props.LGA.map(state => (
            <option value={state.name} key={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setNewBranchDetail([{ address: e.target.value }])
          }
          className={styles.input}
          placeholder="Address"
          type="text"
        />
      </div>
      <div className={styles.controls}>
        <White click={props.toggleCreateBranch}>Cancel</White>
        <Red click={props.createBranch}>Create Branch</Red>
      </div>
    </section>
  </Modal>
);

NewBranch.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  toggleCreateBranch: PropTypes.func.isRequired,
  showCreateBranch: PropTypes.bool.isRequired,
  createBranch: PropTypes.func.isRequired,
  newBranch: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
