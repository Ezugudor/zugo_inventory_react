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
      showNewForm={props.showNewForm}
      showBuilder={props.showBuilder}
      toggleNewForm={props.toggleNewForm}
      onChange={props.setNewFormName}
      name={props.newFormName}
    />
  </AdminLayout>
);

FormView.propTypes = {
  toggleNewForm: PropTypes.func.isRequired,
  showNewForm: PropTypes.bool.isRequired,
  showBuilder: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  forms: PropTypes.array,
  name: PropTypes.string.isRequired
};
