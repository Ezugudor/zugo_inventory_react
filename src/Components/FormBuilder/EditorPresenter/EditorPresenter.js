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
          if (ele.type === "introduction" || ele.type === "official-section")
            return null;
          return (
            <Editor
              setElementChildren={props.setElementChildren}
              deleteQuestion={props.deleteQuestion}
              setElementName={props.setElementName}
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
  setElementChildren: PropTypes.func.isRequired,
  setElementName: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired,
  addNextEditor: PropTypes.func.isRequired
};
