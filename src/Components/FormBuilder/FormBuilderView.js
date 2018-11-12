import { EditorPresenter } from "./EditorPresenter";
import { Aux } from "../../Hoc/Auxiliary";
import { Setting } from "./Settings";
import React from "react";

const view = props => (
  <Aux>
    <Setting />
    <EditorPresenter />
  </Aux>
);

export const FormBuilderView = view;
