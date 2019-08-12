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
    // const children = this.props.element.children.join("\n");
    const children = this.props.element.children;
    this.state = {
      value: text ? Plain.deserialize(text) : editorDefaultValue(),
      childValue: editorDefaultValue()
      // childValue: children ? Plain.deserialize(children) : editorDefaultValue()
    };
  }

  onChange = ({ value }, parent) => {
    console.dir("checkin the value of the on change event", value);
    console.dir("checkin the value of the on parent", parent);
    this.setState({ value });
    const editorContent = Plain.serialize(value);
    if (this.editorPointer.current) {
      const { id } = this.editorPointer.current.props;
      console.log(
        "get other thingws and not just the question ID",
        this.editorPointer.current.props
      );
      this.props.setQuestionProperty("name", id, editorContent, parent);
    }
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

  // Ezugudor Addendum
  onDeleteBtnClick = (event, parent) => {
    event.preventDefault();
    const { id } = this.editorPointer.current.props;
    this.props.deleteQuestion(id, parent);
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
        <a
          className={Style.removeElem}
          onClick={e => {
            this.onDeleteBtnClick(e, parent);
          }}
        >
          <i className="fa fa-times-circle"></i>
        </a>
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
              onKeyDown={this.onKeyDown}
            />

            {!element.isCompact ? (
              <SlateEditor
                id={this.props.element.id}
                type={this.props.element.type}
                value={this.state.childValue}
                placeholder="- Choice"
                onChange={this.getChildContent}
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
