import Style from "./Editor.module.css";
import { editorDefaultValue } from "../../../../utils";
import { Editor as SlateEditor } from "slate-react";
import Plain from "slate-plain-serializer";
import React, { Component } from "react";
import { EditorView } from "./View";
import PropTypes from "prop-types";

class Class extends Component {
  constructor(props) {
    super(props);
    this.editorPointer = React.createRef();
    this.childPointer = React.createRef();
    const text = this.props.element.name;
    console.log("logging inside editor for parent", this.props);
    // const children = this.props.element.children.join("\n");
    const children = this.props.element.children;
    this.state = {
      value: text ? Plain.deserialize(text) : editorDefaultValue(),
      childValue: editorDefaultValue()
      // childValue: children ? Plain.deserialize(children) : editorDefaultValue()
    };
  }

  onChange = ({ value }, parent) => {
    this.setState({ value });
    const editorContent = Plain.serialize(value);
    if (this.editorPointer.current) {
      const { id } = this.editorPointer.current.props;
      this.props.setQuestionProperty("name", id, editorContent, parent);
    }
  };
  onClicked = parent => {
    // console.log("closest log", parent);
    // const { id } = this.editorPointer.current.props;
    // this.props.setCurrentEditor(id, parent);
  };

  onKeyDown = (event, change, next) => {
    const { type, id } = this.editorPointer.current.props;
    const editorContent = Plain.serialize(change.value);
    if (
      event.key === "Enter" &&
      (type === "multichoice" || type === "dropdown" || type === "statement")
    ) {
      event.preventDefault();
      this.childPointer.current.focus();
      return true;
    }
    if (event.key === "Backspace" && !editorContent) {
      this.props.deleteQuestion(id);
    }

    return next();
  };

  onDeleteBtnClick = (event, parent) => {
    event.preventDefault();
    const { id } = this.editorPointer.current.props;
    this.props.deleteQuestion(id, parent);
  };

  onConfigBtnClick = (event, parent) => {
    event.preventDefault();
    const { id } = this.editorPointer.current.props;
    this.props.setCurrentEditor(id, parent);
    this.props.click();
  };

  getChildContent = ({ value }) => {
    const { id } = this.childPointer.current.props;
    const content = Plain.serialize(value).split("\n");

    this.props.setElementChildren(id, content);
    this.setState({ childValue: value });
  };

  onChildKeyDown = (event, change, next) => {
    if (event.key !== "Enter") return next();
    change.insertBlock("");
  };

  showDeleteButton = (element, parent) => {
    if (!element.compactRequired) {
      return (
        <div className={Style.controlCont}>
          <a
            className={Style.configElem}
            onClick={e => {
              this.onConfigBtnClick(e, parent);
            }}
          >
            <i className="ion ion-ios-settings"></i>
          </a>
          <a
            className={Style.removeElem}
            onClick={e => {
              this.onDeleteBtnClick(e, parent);
            }}
          >
            <i className="ion ion-ios-close-outline"></i>
          </a>
          <div className={Style.clearfix}></div>
        </div>
      );
    } else {
      return (
        <div className={Style.controlCont}>
          <a
            className={Style.configElem}
            onClick={e => {
              this.onConfigBtnClick(e, parent);
            }}
          >
            <i className="ion ion-ios-settings"></i>
          </a>
          <div className={Style.clearfix}></div>
        </div>
      );
    }
  };

  renderPlaceholder = (props, next) => {
    const { node } = props;
    if (node.object !== "block") return next();
    if (node.text !== "") return next();

    return (
      <span
        contentEditable={false}
        style={{
          display: "inline-block",
          width: "0",
          whiteSpace: "nowrap",
          opacity: "0.33"
        }}
      >
        - Choice
      </span>
    );
  };

  renderEditor = (type, element, parent) => {
    switch (type) {
      case "multichoice":
      case "statement":
      case "dropdown":
        return (
          <div>
            {this.showDeleteButton(element, parent)}
            <SlateEditor
              id={this.props.element.id}
              type={this.props.element.type}
              value={this.state.value}
              onChange={e => {
                this.onChange(e, parent);
              }}
              placeholder="Type your question here"
              ref={this.editorPointer}
              spellCheck={true}
              onClick={e => this.onClicked(parent)}
              onKeyDown={this.onKeyDown}
            />

            {!element.isCompact ? (
              <SlateEditor
                id={this.props.element.id}
                type={this.props.element.type}
                value={this.state.childValue}
                placeholder="- Choice"
                onChange={this.getChildContent}
                onClick={e => this.onClicked(parent)}
                ref={this.childPointer}
                onKeyDown={this.onChildKeyDown}
                renderPlaceholder={this.renderPlaceholder}
              />
            ) : null}
          </div>
        );
      case "address":
      case "branch":
        return (
          <div>
            {/* <a
              className="remove-elem"
              onClick={this.onDeleteBtnClick}
              style={{
                position: "absolute",
                top: "10px",
                right: "6px",
                cursor: "pointer"
              }}
            >
              <i className="fa fa-times-circle"></i>
            </a> */}

            <SlateEditor
              id={this.props.element.id}
              type={this.props.element.type}
              value={this.state.value}
              placeholder="Type your question here"
              onKeyDown={this.onKeyDown}
              ref={this.editorPointer}
              onChange={e => {
                this.onChange(e, parent);
              }}
              spellCheck={true}
              onClick={e => this.onClicked(parent)}
              renderPlaceholder={this.renderPlaceholder}
            />
          </div>
        );

      default:
        return (
          <div>
            {this.showDeleteButton(element, parent)}
            <SlateEditor
              id={this.props.element.id}
              type={this.props.element.type}
              value={this.state.value}
              placeholder="Type your question here"
              onKeyDown={this.onKeyDown}
              ref={this.editorPointer}
              onChange={e => {
                this.onChange(e, parent);
              }}
              onClick={e => this.onClicked(parent)}
              spellCheck={true}
              renderPlaceholder={this.renderPlaceholder}
            />
          </div>
        );
    }
  };

  render() {
    return (
      <EditorView {...this.props}>
        {this.renderEditor(
          this.props.element.type,
          this.props.element,
          this.props.parent
        )}
      </EditorView>
    );
  }
}

Class.propTypes = {
  setQuestionProperty: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  element: PropTypes.object.isRequired,
  setCurrentEditor: PropTypes.func
};

export const Editor = Class;
