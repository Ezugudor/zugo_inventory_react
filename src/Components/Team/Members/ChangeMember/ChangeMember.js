import { White, Red } from "../../../Utils/Buttons";
import styles from "./ChangeMember.module.css";
import { Modal } from "../../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const ChangeMember = props => (
  <Modal show={props.showUpdateUser} click={props.toggleUpdateUser}>
    <section className={styles.section}>
      <h3 className={styles.text}>Edit User</h3>
      <div className={styles.inputBox}>
        <select
          onChange={e => props.setUpdateUserDetail("branch", e.target.value)}
          value={props.editMember.branch}
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
      <div className={styles.inputBox}>
        {console.log("checking role", props.editMember.role)}
        <select
          id="role"
          className={[styles.input, "role"].join(" ")}
          required="required"
          value={props.editMember.role}
          onChange={e => props.setUpdateUserDetail("role", e.target.value)}
        >
          <option>Select Role</option>
          <option value="initiator">Initiator</option>
          <option value="super_initiator">Super Initiator</option>
          <option value="approver">Approver</option>
          <option value="super_approver">Super Approver</option>
        </select>
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setUpdateUserDetail("firstname", e.target.value)}
          className={[styles.input, "firstname"].join(" ")}
          placeholder="First Name"
          value={props.editMember.firstname}
          type="text"
          required="required"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setUpdateUserDetail("lastname", e.target.value)}
          className={[styles.input, "lastname"].join(" ")}
          placeholder="Last Name"
          value={props.editMember.lastname}
          required="required"
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setUpdateUserDetail("email", e.target.value)}
          className={[styles.input, "email"].join(" ")}
          placeholder="Work Email"
          required="required"
          value={props.editMember.email}
          type="email"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setUpdateUserDetail("phone", e.target.value)}
          className={[styles.input, "phone"].join(" ")}
          placeholder="Phone Number"
          value={props.editMember.phone}
          required="required"
          type="text"
          maxLength="14"
        />
      </div>
      <div className={styles.controls}>
        <White click={props.toggleUpdateUser}>Cancel</White>
        <Red click={props.updateUser}>Update User</Red>
      </div>
    </section>
  </Modal>
);

ChangeMember.propTypes = {
  setUpdateUserDetail: PropTypes.func.isRequired,
  toggleUpdateUser: PropTypes.func.isRequired,
  showUpdateUser: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  branches: PropTypes.array.isRequired
};
