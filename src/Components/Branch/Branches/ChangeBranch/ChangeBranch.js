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
          onChange={e => props.setSelectedLGA(e.target.value, "edit")}
        >
          <option>Select State</option>
          {props.getArrangedState().map(state => (
            <option value={state.state.id} key={state.state.name}>
              {props.stripState(state.state.name)}
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
        <Red click={props.changeBranch}>Update</Red>
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
