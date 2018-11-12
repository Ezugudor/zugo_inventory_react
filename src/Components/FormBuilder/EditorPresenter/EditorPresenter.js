import Style from "./EditorPresenter.module.css";
import { Editor } from "./Editor";
import React from "react";

const view = props => (
  <section className={Style.editorPresenter}>
    <div className={Style.editorsContainer}>
      <Editor />
      <Editor />
    </div>
  </section>
);

export const EditorPresenter = view;
