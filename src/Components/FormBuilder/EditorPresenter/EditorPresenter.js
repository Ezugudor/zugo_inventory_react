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
        <div className={`${Style.editorsContainer} overflow_scroll`}>
          {this.props.formElements.map(ele => {
            //  don't show an editor for introduction
            if (ele.type === "introduction") return null;

            return ele.type == "branch" || ele.type == "address" ? (
              <div className={Style.compactAllCont}>
                <Editor
                  ref={this.editorElement}
                  setQuestionProperty={this.props.setQuestionProperty}
                  setCurrentEditor={this.props.setCurrentEditor}
                  setElementChildren={this.props.setElementChildren}
                  deleteQuestion={this.props.deleteQuestion}
                  element={ele}
                  key={ele.id}
                  click={this.props.toggleConfigModal}
                />

                <div className={Style.controlCont}>
                  <a
                    className={Style.configElem}
                    onClick={e => {
                      this.props.onConfigBtnClick(e);
                    }}
                  >
                    <i className="ion ion-ios-settings"></i>
                  </a>

                  <a
                    className={Style.removeElem}
                    onClick={() => {
                      this.deleteCompact(ele.id);
                    }}
                  >
                    <i className="ion ion-ios-close-outline"></i>
                  </a>

                  <div className={Style.clearfix}></div>
                </div>
                <div className={Style.compactCont}>
                  {ele.children.map(child => {
                    return (
                      <Editor
                        ref={this.editorElement}
                        setQuestionProperty={this.props.setQuestionProperty}
                        setCurrentEditor={this.props.setCurrentEditor}
                        setElementChildren={this.props.setElementChildren}
                        deleteQuestion={this.props.deleteQuestion}
                        element={child}
                        parent={ele}
                        key={child.id}
                        click={this.props.toggleConfigModal}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <Editor
                setQuestionProperty={this.props.setQuestionProperty}
                setCurrentEditor={this.props.setCurrentEditor}
                setElementChildren={this.props.setElementChildren}
                deleteQuestion={this.props.deleteQuestion}
                element={ele}
                key={ele.id}
                click={this.props.toggleConfigModal}
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
