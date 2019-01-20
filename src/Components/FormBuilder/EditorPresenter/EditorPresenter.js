import Style from "./EditorPresenter.module.css";
import PropTypes from "prop-types";
import { Editor } from "./Editor";
import React from "react";

export const EditorPresenter = props => {
  return (
    <section className={Style.editorPresenter}>
      <div className={Style.editorsContainer}>
        {props.formElements.map(ele => {
          //  don't show an editor for introduction
          if (ele.type === "introduction") return null;
          return (
            <Editor
              setQuestionProperty={props.setQuestionProperty}
              setElementChildren={props.setElementChildren}
              deleteQuestion={props.deleteQuestion}
              addNextEditor={props.addNextEditor}
              element={ele}
              key={ele.id}
            />
          );
        })}
      </div>
    </section>
  );
};

EditorPresenter.propTypes = {
  setQuestionProperty: PropTypes.func.isRequired,
  setElementChildren: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired,
  addNextEditor: PropTypes.func.isRequired
};
