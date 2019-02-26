import { White, Red } from "../../../Utils/Buttons";
import styles from "./NewMember.module.css";
import { Modal } from "../../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const NewMember = props => (
  <Modal show={props.showCreateMember} click={props.toggleCreateMember}>
    <section className={styles.section}>
      <h3 className={styles.text}>New Team Member</h3>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewMemberDetail("firstname", e.target.value)}
          className={styles.input}
          placeholder="First Name"
          value={props.newMember.firstname}
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewMemberDetail("lastname", e.target.value)}
          className={styles.input}
          placeholder="Last Name"
          value={props.newMember.lastname}
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewMemberDetail("email", e.target.value)}
          className={styles.input}
          placeholder="Work Email"
          value={props.newMember.email}
          type="email"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewMemberDetail("phone", e.target.value)}
          className={styles.input}
          placeholder="Phone Number"
          value={props.newMember.phone}
          type="number"
        />
      </div>
      <div className={styles.inputBox}>
        <select
          id="role"
          className={styles.input}
          onChange={e => props.setNewMemberDetail("role", e.target.value)}
        >
          <option>Select Role</option>
          <option value="initiator">Initiator</option>
          <option value="approver">Approver</option>
        </select>
      </div>
      <div className={styles.inputBox}>
        <select
          className={styles.input}
          id="branch"
          onChange={e => props.setNewMemberDetail("branch", e.target.value)}
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
        <White click={props.toggleCreateMember}>Cancel</White>
        <Red click={props.createMember}>Create Account!</Red>
      </div>
    </section>
  </Modal>
);

NewMember.propTypes = {
  setNewMemberDetail: PropTypes.func.isRequired,
  toggleCreateMember: PropTypes.func.isRequired,
  showCreateMember: PropTypes.bool.isRequired,
  createMember: PropTypes.func.isRequired,
  newMember: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
