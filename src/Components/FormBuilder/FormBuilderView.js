import { FormBuiderLayout } from "../../Hoc/Layouts";
import { EditorPresenter } from "./EditorPresenter";
import { FormPresenter } from "./FormPresenter";
import { Setting } from "./Settings";
import PropTypes from "prop-types";
import React from "react";

export const FormBuilderView = props => (
  <FormBuiderLayout
    changeConfigWindow={props.changeConfigWindow}
    settingsWindowName={props.settingsWindowName}
    save={props.save}
  >
    <Setting
      handleRequirementInput={props.handleRequirementInput}
      currentElementType={props.currentElementType}
      settingsWindowName={props.settingsWindowName}
      toggleConfigWindow={props.toggleConfigWindow}
      showSettingsWindow={props.showSettingsWindow}
      addElement={props.addElement}
    />
    <EditorPresenter {...props} />
    <FormPresenter elements={props.formElements} />
  </FormBuiderLayout>
);

FormBuilderView.propTypes = {
  handleRequirementInput: PropTypes.func.isRequired,
  currentElementType: PropTypes.string.isRequired,
  settingsWindowName: PropTypes.string.isRequired,
  showSettingsWindow: PropTypes.bool.isRequired,
  toggleConfigWindow: PropTypes.func.isRequired,
  setElementChildren: PropTypes.func.isRequired,
  changeConfigWindow: PropTypes.func.isRequired,
  setElementName: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired,
  addNextEditor: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func,
  save: PropTypes.func.isRequired
};
