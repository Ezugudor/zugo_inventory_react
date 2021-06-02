import { White, Red } from "../../Utils/Buttons";
import styles from "./DeleteStock.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const DeleteStock = props => (
  <Modal show={props.showDeleteEntity} click={props.toggleDeleteEntity}>
    <section className={styles.section}>
      <h3 className={styles.text}>Delete {props.currentEntity.product_name}</h3>
      <div className={styles.controls}>
        <White click={props.toggleDeleteEntity}>Cancel</White>
        <Red click={props.deleteEntity} extStyle={styles}>
          Confirm
        </Red>
      </div>
    </section>
  </Modal>
);

DeleteStock.propTypes = {
  toggleDeleteEntity: PropTypes.func.isRequired,
  showDeleteEntity: PropTypes.bool.isRequired,
  currentEntity: PropTypes.object.isRequired,
  deleteEntity: PropTypes.func.isRequired
};
