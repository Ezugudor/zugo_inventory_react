import { White, Red } from "../../Utils/Buttons";
import styles from "./PublishForm.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const PublishForm = props => (
  <Modal show={props.showPublish} click={props.togglePublish}>
    <section className={styles.section}>
      <h3 className={styles.text}>
        {props.title} {props.form.name}
      </h3>
      <div className={styles.controls}>
        <White click={props.togglePublish}>Cancel</White>
        <Red click={props.publishAction}>Confirm</Red>
      </div>
    </section>
  </Modal>
);

PublishForm.propTypes = {
  togglePublish: PropTypes.func.isRequired,
  showPublish: PropTypes.bool.isRequired,
  deleteForm: PropTypes.func.isRequired
};
