import { White, Red } from "../../Utils/Buttons";
import Style from "./NewForm.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

const View = props => (
  <Modal show={props.showNewForm} click={props.toggleNewForm}>
    <section>
      <h3 className={Style.Text}>New Form</h3>
      <div className={Style.InputBox}>
        <input
          className={Style.Input}
          type="text"
          placeholder="Form Name"
          value={props.name}
          onChange={props.onChange}
        />
      </div>
      <div className={Style.Controls}>
        <White onClick={props.toggleNewForm}>Cancel</White>
        <Red onClick={props.showBuilder}>Build Form</Red>
      </div>
    </section>
  </Modal>
);

View.proptypes = {
  showNewForm: PropTypes.string.isRequired,
  toggleNewForm: PropTypes.func.isRequired,
  showBuilder: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export const NewForm = View;
