import { EditorPresenter } from "./EditorPresenter";
import { FormPresenter } from "./FormPresenter";
import { Aux } from "../../Hoc/Auxiliary";
import { Setting } from "./Settings";
import PropTypes from "prop-types";
import React from "react";

const view = props => (
  <Aux>
    <Setting {...props} />
    <EditorPresenter {...props} />
    <FormPresenter elements={props.formElements} />
  </Aux>
);

view.propTypes = {
  setElementChildren: PropTypes.func.isRequired,
  setElementName: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired,
  addNextEditor: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func
};
export const FormBuilderView = view;
