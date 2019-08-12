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
          onChange={e =>
            props.setNewMemberDetail("firstname", e.target.value, e.target)
          }
          className={[styles.input, "firstname"].join(" ")}
          placeholder="First Name"
          value={props.newMember.firstname}
          type="text"
          required="required"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setNewMemberDetail("lastname", e.target.value, e.target)
          }
          className={[styles.input, "lastname"].join(" ")}
          placeholder="Last Name"
          value={props.newMember.lastname}
          required="required"
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setNewMemberDetail("email", e.target.value, e.target)
          }
          className={[styles.input, "email"].join(" ")}
          placeholder="Work Email"
          required="required"
          value={props.newMember.email}
          type="email"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setNewMemberDetail("phone", e.target.value, e.target)
          }
          className={[styles.input, "phone"].join(" ")}
          placeholder="Phone Number"
          value={props.newMember.phone}
          required="required"
          type="text"
          maxLength="14"
        />
      </div>
      <div className={styles.inputBox}>
        <select
          id="role"
          className={[styles.input, "role"].join(" ")}
          required="required"
          onChange={e =>
            props.setNewMemberDetail("role", e.target.value, e.target)
          }
        >
          <option>Select Role</option>
          <option value="initiator">Initiator</option>
          <option value="super_initiator">Super Initiator</option>
          <option value="approver">Approver</option>
          <option value="super_approver">Super Approver</option>
        </select>
      </div>
      <div className={styles.inputBox}>
        <select
          className={[styles.input, "branch"].join(" ")}
          id="branch"
          onChange={e =>
            props.setNewMemberDetail("branch", e.target.value, e.target)
          }
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
        <Red click={props.createMember}>Create Account</Red>
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
