import { AdminLayout } from "../../Hoc/Layouts";
import { FormsControls } from "./Controls";
import { chunkData } from "../../utils";
import { NewForm } from "./NewForm";
import { DeleteForm } from "./DeleteForm";
import PropTypes from "prop-types";
import { Cards } from "./Cards";
import React from "react";
import { Notification, Loading } from "../Utils";
import Styles from "./FormsView.module.css";

export const FormsView = props => (
  <AdminLayout pageName="form" currentUser={props.currentUser}>
    <div className={Styles.form}>
      <FormsControls
        toggleNewForm={props.toggleNewForm}
        toggleEditMode={props.toggleEditMode}
        formType={props.formType}
      />
      <Cards
        forms={chunkData(props.forms, 4)}
        showBuilderEdit={props.showBuilderEdit}
        editMode={props.editMode}
        setFormToDelete={props.setFormToDelete}
      />
      <NewForm
        toggleNewForm={props.toggleNewForm}
        handleInput={props.handleInput}
        showNewForm={props.showNewForm}
        createForm={props.createForm}
        name={props.name}
      />
      <DeleteForm
        toggleDelete={props.toggleDelete}
        showDelete={props.showDeleteModal}
        form={props.formToDelete}
        deleteForm={props.deleteForm}
      />
      <Notification />
      <Loading showLoading={props.showLoading} />
    </div>
  </AdminLayout>
);

FormsView.propTypes = {
  toggleNewForm: PropTypes.func.isRequired,
  showNewForm: PropTypes.bool.isRequired,
  showBuilder: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  formType: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  forms: PropTypes.array
};
