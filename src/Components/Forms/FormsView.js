import { AdminLayout } from "../../Hoc/Layouts";
import { FormsControls } from "./Controls";
import { chunkData } from "../../utils";
import { NewForm } from "./NewForm";
import PropTypes from "prop-types";
import { Cards } from "./Cards";
import React from "react";
import { Notification } from "../Utils";
import Styles from "./FormsView.module.css";

export const FormsView = props => (
  <AdminLayout pageName="form" currentUser={props.currentUser}>
    <div className={Styles.form}>
      <FormsControls
        toggleNewForm={props.toggleNewForm}
        formType={props.formType}
      />
      <Cards
        forms={chunkData(props.forms, 4)}
        showBuilderEdit={props.showBuilderEdit}
      />
      <NewForm
        toggleNewForm={props.toggleNewForm}
        handleInput={props.handleInput}
        showNewForm={props.showNewForm}
        showBuilder={props.showBuilder}
        name={props.name}
      />
      <Notification title={"Default Title"} message={"Default Body Message"} />
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
