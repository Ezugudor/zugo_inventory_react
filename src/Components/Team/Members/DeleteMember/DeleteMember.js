import { White, Red } from "../../../Utils/Buttons";
import styles from "./DeleteMember.module.css";
import { Modal } from "../../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const DeleteMember = props => (
  <Modal show={props.showDeleteMember} click={props.toggleDeleteMember}>
    <section className={styles.section}>
      <h3 className={styles.text}>Delete {props.memberToDelete.name}</h3>
      <div className={styles.controls}>
        <White click={props.toggleDeleteMember}>Cancel</White>
        <Red click={props.deleteMember}>Confirm!</Red>
      </div>
    </section>
  </Modal>
);

DeleteMember.propTypes = {
  toggleDeleteMember: PropTypes.func.isRequired,
  showDeleteMember: PropTypes.bool.isRequired,
  memberToDelete: PropTypes.object.isRequired,
  deleteMember: PropTypes.func.isRequired
};
