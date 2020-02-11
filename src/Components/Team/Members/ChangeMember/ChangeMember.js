import { White, Red } from "../../../Utils/Buttons";
import styles from "./ChangeMember.module.css";
import { FileUpload, PreviewImage } from "../../../Utils";
import { Modal } from "../../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const ChangeMember = props => (
  <Modal show={props.showUpdateUser} click={props.toggleUpdateUser}>
    <section id={props.editMemberFormId} className={styles.section}>
      {console.log("is ita", props.editMemberFormId)}
      <h3 className={styles.text}>Edit User</h3>

      <div className={styles.inputBox}>
        {console.log("checking role", props.editMember.role)}
        <select
          id="role"
          className={[styles.input, "role"].join(" ")}
          required="required"
          value={props.editMember.role}
          onChange={e =>
            props.setUpdateUserDetail("role", e.target.value, e.target)
          }
        >
          <option>Select Role</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setUpdateUserDetail("firstname", e.target.value, e.target)
          }
          className={[styles.input, "firstname"].join(" ")}
          placeholder="First Name"
          value={props.editMember.firstname}
          type="text"
          required="required"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setUpdateUserDetail("lastname", e.target.value, e.target)
          }
          className={[styles.input, "lastname"].join(" ")}
          placeholder="Last Name"
          value={props.editMember.lastname}
          required="required"
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setUpdateUserDetail("email", e.target.value, e.target)
          }
          className={[styles.input, "email"].join(" ")}
          placeholder="Email Address"
          required="required"
          value={props.editMember.email}
          type="email"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setUpdateUserDetail("phone", e.target.value, e.target)
          }
          className={[styles.input, "phone"].join(" ")}
          placeholder="Phone Number"
          value={props.editMember.phone}
          required="required"
          type="text"
          maxLength="14"
        />
      </div>
      <div className={styles.dzPrevCont}>
        <div className={styles.prevCont}>
          <div className={styles.prevContInside}>
            <PreviewImage imageURL={props.editMemberImageURL} />
          </div>
        </div>
        <div className={styles.dzCont}>
          <FileUpload
            handleUpload={props.handleUpload}
            progress={props.progress}
            placeholder={"Click to edit user image or drag and drop "}
            mode={"edit"}
          />
        </div>

        <div className={styles.clearfix}></div>
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
