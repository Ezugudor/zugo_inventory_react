import { White, Red } from "../../../Utils/Buttons";
import styles from "./ChangeBranch.module.css";
import { Modal } from "../../../Utils";
import { countryStates } from "../../../../utils";
import PropTypes from "prop-types";
import React from "react";

export const ChangeBranch = props => (
  <Modal show={props.showChangeBranch} click={props.toggleChangeBranch}>
    <section className={styles.section}>
      {console.log("propzzz branches", props.branches)}
      {console.log("propz accounts", props.branchToChange)}
      <h3 className={styles.text}>Change Branch</h3>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setEditBranchDetail("name", e.target.value)}
          className={styles.input}
          placeholder="Name"
          type="text"
          value={props.branchToChange.name}
        />
      </div>
      <div className={styles.inputBox}>
        <select
          id="role"
          className={styles.input}
          onChange={e => {
            return props.setSelectedLGA(
              e.target[e.target.selectedIndex].dataset.id,
              "edit"
            );
          }}
          value={props.branchToChange.state}
        >
          <option>Select State</option>
          {countryStates.map(state => (
            <option
              value={state.state.name}
              key={state.state.id}
              data-id={state.state.id}
            >
              {state.state.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputBox}>
        <select
          className={styles.input}
          id="branch"
          onChange={e => props.setEditBranchDetail("area", e.target.value)}
          value={props.branchToChange.area}
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
          onChange={e => props.setEditBranchDetail("address", e.target.value)}
          className={styles.input}
          placeholder="Address"
          type="text"
          value={props.branchToChange.address}
        />
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
