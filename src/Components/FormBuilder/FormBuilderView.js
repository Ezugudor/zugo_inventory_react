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
      addQuestionIntroChild={props.addQuestionIntroChild}
      setQuestionProperty={props.setQuestionProperty}
      settingsWindowName={props.settingsWindowName}
      toggleConfigWindow={props.toggleConfigWindow}
      showSettingsWindow={props.showSettingsWindow}
      addValidationRule={props.addValidationRule}
      currentElement={props.currentElement}
      addElement={props.addElement}
    />
    <EditorPresenter
      setQuestionProperty={props.setQuestionProperty}
      setElementChildren={props.setElementChildren}
      deleteQuestion={props.deleteQuestion}
      addNextEditor={props.addNextEditor}
      formElements={props.formElements}
    />
    <FormPresenter elements={props.formElements} formName={props.formName} />
  </FormBuiderLayout>
);

FormBuilderView.propTypes = {
  addQuestionIntroChild: PropTypes.func.isRequired,
  settingsWindowName: PropTypes.string.isRequired,
  setQuestionProperty: PropTypes.func.isRequired,
  showSettingsWindow: PropTypes.bool.isRequired,
  toggleConfigWindow: PropTypes.func.isRequired,
  setElementChildren: PropTypes.func.isRequired,
  changeConfigWindow: PropTypes.func.isRequired,
  addValidationRule: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired,
  addNextEditor: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  addElement: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func,
  save: PropTypes.func.isRequired
};
