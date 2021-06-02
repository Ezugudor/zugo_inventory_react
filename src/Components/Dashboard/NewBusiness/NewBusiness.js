import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./NewBusiness.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const NewBusiness = props => (
  <Modal show={props.showCreateBusiness} click={props.toggleCreateBusiness}>
    <section id={props.newMemberFormId} className={styles.section}>
      <h3 className={styles.header}>New Business</h3>
      <label className={styles.sectionHeader}>Business Info:</label>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewBusinessDetail(e, "business_name")}
          className={[styles.input, "firstname"].join(" ")}
          placeholder="Business Name"
          type="text"
          required="required"
        />
      </div>
      <label className={styles.sectionHeader}>Account Manager's Info:</label>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewBusinessDetail(e, "firstname")}
          className={[styles.input, "lastname"].join(" ")}
          placeholder="Firstname"
          required="required"
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewBusinessDetail(e, "lastname")}
          className={[styles.input, "email"].join(" ")}
          placeholder="Lastname"
          required="required"
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewBusinessDetail(e, "email")}
          className={[styles.input, "email"].join(" ")}
          placeholder="Email"
          required="required"
          type="email"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewBusinessDetail(e, "phone")}
          className={[styles.input, "email"].join(" ")}
          placeholder="Phone"
          required="required"
          value={props.newBusinessDetails.color}
          type="text"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={e => props.setNewBusinessDetail(e, "password")}
          className={[styles.input, "email"].join(" ")}
          placeholder="Password"
          required="required"
          value={props.newBusinessDetails.color}
          type="password"
        />
      </div>

      <div className={styles.dzPrevCont}>
        <div className={styles.prevCont}>
          <div className={styles.prevContInside}>
            <PreviewImage
              styles={styles.prevImgPlaceholder}
              imageURL={props.newBusinessDetails.imageURL}
              text={"No new Image"}
            />
          </div>
        </div>
        <div className={styles.dzCont}>
          <FileUpload
            handleUpload={props.handleUpload}
            progress={props.progress}
            placeholder={"Click to edit user image or drag and drop "}
            mode={"new"}
            style={styles.dzInside}
          />
        </div>

        <div className={styles.clearfix}></div>
      </div>
      <div className={styles.controls}>
        <White click={props.toggleCreateBusiness}>Cancel</White>
        <Red click={props.createBusiness}>Create Business</Red>
      </div>
    </section>
  </Modal>
);

NewBusiness.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
