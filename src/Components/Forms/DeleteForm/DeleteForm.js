import { White, Red } from "../../Utils/Buttons";
import styles from "./DeleteForm.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const DeleteForm = props => (
  <Modal show={props.showDelete} click={props.toggleDelete}>
    <section className={styles.section}>
      <h3 className={styles.text}>Delete {props.form.name}</h3>
      <div className={styles.controls}>
        <White click={props.toggleDelete}>Cancel</White>
        <Red click={props.deleteForm}>Confirm</Red>
      </div>
    </section>
  </Modal>
);

DeleteForm.propTypes = {
  toggleDelete: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  deleteForm: PropTypes.func.isRequired
};
