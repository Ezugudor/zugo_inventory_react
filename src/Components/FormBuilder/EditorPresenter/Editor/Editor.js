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
    const children = this.props.element.children.join("\n");
    this.state = {
      value: text ? Plain.deserialize(text) : editorDefaultValue(),
      childValue: children ? Plain.deserialize(children) : editorDefaultValue()
    };
  }

  onChange = ({ value }) => {
    this.setState({ value });
    const editorContent = Plain.serialize(value);
    if (this.editorPointer.current) {
      const { id } = this.editorPointer.current.props;
      this.props.setQuestionProperty("name", id, editorContent);
    }
  };

  onKeyDown = (event, change, next) => {
    const { type, id } = this.editorPointer.current.props;
    const editorContent = Plain.serialize(change.value);
    if (
      event.key === "Enter" &&
      (type === "multichoice" || type === "dropdown")
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

  renderEditor = type => {
    switch (type) {
      case "multichoice":
      case "dropdown":
        return (
          <div>
            <SlateEditor
              id={this.props.element.id}
              type={this.props.element.type}
              value={this.state.value}
              onChange={this.onChange}
              placeholder="Type your question here"
              ref={this.editorPointer}
              spellCheck={true}
              onKeyDown={this.onKeyDown}
            />
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
          </div>
        );
      default:
        return (
          <SlateEditor
            id={this.props.element.id}
            type={this.props.element.type}
            value={this.state.value}
            placeholder="Type your question here"
            onKeyDown={this.onKeyDown}
            ref={this.editorPointer}
            onChange={this.onChange}
            spellCheck={true}
          />
        );
    }
  };

  render() {
    return (
      <EditorView {...this.props}>
        {this.renderEditor(this.props.element.type)}
      </EditorView>
    );
  }
}

Class.propTypes = {
  setQuestionProperty: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  addNextEditor: PropTypes.func.isRequired,
  element: PropTypes.object.isRequired,
  setCurrentEditor: PropTypes.func
};

export const Editor = Class;
