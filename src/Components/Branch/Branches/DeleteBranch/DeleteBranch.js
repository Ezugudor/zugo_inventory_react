import { White, Red } from "../../../Utils/Buttons";
import styles from "./DeleteBranch.module.css";
import { Modal } from "../../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const DeleteBranch = props => (
  <Modal show={props.showDeleteBranch} click={props.toggleDeleteBranch}>
    <section className={styles.section}>
      <h3 className={styles.text}>Delete {props.branchToDelete.name}</h3>
      <div className={styles.controls}>
        <White click={props.toggleDeleteBranch}>Cancel</White>
        <Red click={props.deleteBranch}>Confirm</Red>
      </div>
    </section>
  </Modal>
);

DeleteBranch.propTypes = {
  toggleDeleteBranch: PropTypes.func.isRequired,
  showDeleteBranch: PropTypes.bool.isRequired,
  branchToDelete: PropTypes.object.isRequired,
  deleteBranch: PropTypes.func.isRequired
};
