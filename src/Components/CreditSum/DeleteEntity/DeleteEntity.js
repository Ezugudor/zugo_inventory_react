import { White, Red } from "../../Utils/Buttons";
import styles from "./DeleteEntity.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

const getName = currentEntity => {
  const cE = currentEntity;
  return cE.is_outlet !== "0"
    ? cE.outlet_name
    : `${cE.customer_surname} ${cE.customer_firstname}`;
};
export const DeleteEntity = props => (
  <Modal show={props.showDeleteEntity} click={props.toggleDeleteEntity}>
    <section className={styles.section}>
      <h3 className={styles.text}>Delete {getName(props.currentEntity)}</h3>
      <div className={styles.controls}>
        <White click={props.toggleDeleteEntity}>Cancel</White>
        <Red click={props.deleteEntity} extStyle={styles}>
          Confirm
        </Red>
      </div>
    </section>
  </Modal>
);

DeleteEntity.propTypes = {
  toggleDeleteEntity: PropTypes.func.isRequired,
  showDeleteEntity: PropTypes.bool.isRequired,
  currentEntity: PropTypes.object.isRequired,
  deleteEntity: PropTypes.func.isRequired
};
