import { White, Red } from "../Buttons";
import styles from "./Prompt.module.css";
import { Modal } from "../";
import PropTypes from "prop-types";
import React from "react";

export const Prompt = props => (
  <Modal
    show={props.showPrompt}
    click={e => props.togglePrompt(props.promptState)}
  >
    <section className={styles.section}>
      <h3 className={styles.text}>
        {/* {props.title} {props.form.name} */}
        {props.title}
      </h3>
      <div className={styles.controls}>
        <White click={e => props.togglePrompt(props.promptState)}>Cancel</White>
        <Red click={props.confirmAction}>Confirm</Red>
      </div>
    </section>
  </Modal>
);

Prompt.propTypes = {
  togglePrompt: PropTypes.func.isRequired,
  showPrompt: PropTypes.bool.isRequired,
  deleteForm: PropTypes.func.isRequired
};
