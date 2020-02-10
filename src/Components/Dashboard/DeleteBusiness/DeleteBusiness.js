import { White, Red } from "../../Utils/Buttons";
import styles from "./DeleteBusiness.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const DeleteBusiness = props => (
  <Modal show={props.showDeleteBusiness} click={props.toggleDeleteBusiness}>
    <section className={styles.section}>
      <h3 className={styles.text}>Delete {props.businessToDelete.name}</h3>
      <div className={styles.controls}>
        <White click={props.toggleDeleteBusiness}>Cancel</White>
        <Red click={props.deleteBusiness}>Confirm</Red>
      </div>
    </section>
  </Modal>
);

DeleteBusiness.propTypes = {
  toggleDeleteBusiness: PropTypes.func.isRequired,
  showDeleteBusiness: PropTypes.bool.isRequired,
  businessToDelete: PropTypes.object.isRequired,
  deleteBusiness: PropTypes.func.isRequired
};
