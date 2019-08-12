import Style from "./EditorPresenter.module.css";
import PropTypes from "prop-types";
import { Editor } from "./Editor";
import React, { Component } from "react";

class Class extends Component {
  constructor(props) {
    super(props);
    this.editorElement = React.createRef();
  }

  deleteCompact = id => {
    this.props.deleteQuestion(id);
  };

  render() {
    return (
      <section className={Style.editorPresenter}>
        <div className={Style.editorsContainer}>
          {this.props.formElements.map(ele => {
            //  don't show an editor for introduction
            if (ele.type === "introduction") return null;

            return ele.type == "branch" || ele.type == "address" ? (
              <div className={Style.compactAllCont}>
                <Editor
                  ref={this.editorElement}
                  setQuestionProperty={this.props.setQuestionProperty}
                  setElementChildren={this.props.setElementChildren}
                  deleteQuestion={this.props.deleteQuestion}
                  element={ele}
                  key={ele.id}
                />
                <a
                  className={Style.removeElem}
                  onClick={() => {
                    this.deleteCompact(ele.id);
                  }}
                >
                  <i className="fa fa-times-circle"></i>
                </a>
                <div className={Style.compactCont}>
                  {ele.children.map(child => {
                    return (
                      <Editor
                        ref={this.editorElement}
                        setQuestionProperty={this.props.setQuestionProperty}
                        setElementChildren={this.props.setElementChildren}
                        deleteQuestion={this.props.deleteQuestion}
                        element={child}
                        parent={ele}
                        key={child.id}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <Editor
                setQuestionProperty={this.props.setQuestionProperty}
                setElementChildren={this.props.setElementChildren}
                deleteQuestion={this.props.deleteQuestion}
                element={ele}
                key={ele.id}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export const EditorPresenter = Class;

EditorPresenter.propTypes = {
  setQuestionProperty: PropTypes.func.isRequired,
  setElementChildren: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired
};
