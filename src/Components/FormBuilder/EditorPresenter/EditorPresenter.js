import Style from "./EditorPresenter.module.css";
import PropTypes from "prop-types";
import { Editor } from "./Editor";
import React from "react";

const view = props => {
  const lastIndex = props.formElements.length - 1;
  return (
    <section className={Style.editorPresenter}>
      <div className={Style.editorsContainer}>
        {props.formElements.map((ele, index) => {
          //  don't show an editor for introduction
          if (ele.type === "introduction") return;
          if (lastIndex === index) {
            return (
              <Editor
                setElementChildren={props.setElementChildren}
                setCurrentEditor={props.setCurrentEditor}
                setElementName={props.setElementName}
                addNextEditor={props.addNextEditor}
                element={ele}
                key={ele.id}
              />
            );
          }
          return (
            <Editor
              setElementChildren={props.setElementChildren}
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

view.propTypes = {
  setElementChildren: PropTypes.func.isRequired,
  setElementName: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired,
  addNextEditor: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func
};
export const EditorPresenter = view;
