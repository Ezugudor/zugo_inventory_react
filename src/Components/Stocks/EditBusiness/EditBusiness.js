import { White, Red } from "../../Utils/Buttons";
import styles from "./EditBusiness.module.css";
import { FileUpload, PreviewImage } from "../../Utils";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const EditBusiness = props => (
  <Modal show={props.showEditBusiness} click={props.toggleEditBusiness}>
    <section id={props.editMemberFormId} className={styles.section}>
      <h3 className={styles.text}>Edit Business</h3>

      <div className={styles.inputBox}>
        <select
          id="role"
          className={[styles.input, "role"].join(" ")}
          required="required"
          value={props.editBusinessDetails.approved}
          onChange={e =>
            props.setUpdateUserDetail("role", e.target.value, e.target)
          }
        >
          <option>Select</option>
          <option value="yes">True</option>
          <option value="no">False</option>
        </select>
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setUpdateUserDetail("name", e.target.value, e.target)
          }
          className={[styles.input, "firstname"].join(" ")}
          placeholder="Business Name"
          value={props.editBusinessDetails.name}
          type="text"
          required="required"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setUpdateUserDetail("description", e.target.value, e.target)
          }
          className={[styles.input, "lastname"].join(" ")}
          placeholder="Business Description"
          value={props.editBusinessDetails.description}
          required="required"
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e =>
            props.setUpdateUserDetail("color", e.target.value, e.target)
          }
          className={[styles.input, "email"].join(" ")}
          placeholder="Business Color"
          required="required"
          value={props.editBusinessDetails.color}
          type="text"
        />
      </div>

      <div className={styles.dzPrevCont}>
        <div className={styles.prevCont}>
          <div className={styles.prevContInside}>
            <PreviewImage imageURL={props.editBusinessDetails.logoUrl} />
          </div>
        </div>
        <div className={styles.dzCont}>
          <FileUpload
            handleUpload={props.handleUpload}
            progress={props.progress}
            placeholder={"Click to edit user image or drag and drop "}
            mode={"edit"}
            style={styles.dzInside}
          />
        </div>

        <div className={styles.clearfix}></div>
      </div>
      <div className={styles.controls}>
        <White click={props.toggleEditBusiness}>Cancel</White>
        <Red click={props.updateUser}>Update User</Red>
      </div>
    </section>
  </Modal>
);

EditBusiness.propTypes = {
  setUpdateUserDetail: PropTypes.func.isRequired,
  toggleEditBusiness: PropTypes.func.isRequired,
  showEditBusiness: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired
};
