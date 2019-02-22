import { White, Red } from "../../Utils/Buttons";
import Style from "./NewForm.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const NewForm = props => (
  <Modal show={props.showNewForm} click={props.toggleNewForm}>
    <section className={Style.newForm}>
      <h3 className={Style.Text}>New Form</h3>
      <div className={Style.InputBox}>
        <input
          onChange={props.handleInput}
          placeholder="Form Name"
          className={Style.Input}
          value={props.name}
          type="text"
        />
      </div>
      <div className={Style.Controls}>
        <White click={props.toggleNewForm}>Cancel</White>
        <Red click={props.showBuilder}>Create</Red>
      </div>
    </section>
  </Modal>
);

NewForm.propTypes = {
  toggleNewForm: PropTypes.func.isRequired,
  showNewForm: PropTypes.bool.isRequired,
  showBuilder: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
