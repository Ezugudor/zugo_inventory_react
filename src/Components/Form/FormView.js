import { AdminLayout } from "../../Hoc/Layouts";
import { chunkData } from "../../utils";
import { FormControls } from "./Controls";
import { NewForm } from "./NewForm";
import PropTypes from "prop-types";
import { Cards } from "./Cards";
import React from "react";

export const FormView = props => (
  <AdminLayout pageName="form">
    <FormControls toggleNewForm={props.toggleNewForm} />
    <Cards forms={chunkData(props.forms, 4)} />
    <NewForm
      toggleNewForm={props.toggleNewForm}
      handleInput={props.handleInput}
      showNewForm={props.showNewForm}
      showBuilder={props.showBuilder}
      name={props.name}
    />
  </AdminLayout>
);

FormView.propTypes = {
  toggleNewForm: PropTypes.func.isRequired,
  showNewForm: PropTypes.bool.isRequired,
  showBuilder: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  forms: PropTypes.array
};
