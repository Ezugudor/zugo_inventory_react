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
          className={Style.Input}
          type="text"
          placeholder="Form Name"
          value={props.name}
          onChange={props.handleInput}
        />
      </div>
      <div className={Style.Controls}>
        <White click={props.toggleNewForm}>Cancel</White>
        <Red click={props.showBuilder}>Build Form</Red>
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
