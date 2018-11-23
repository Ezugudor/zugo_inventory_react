import { getDefaultElement, generateNewElement } from "../../utils";
import { FormBuilderView } from "../../Components/FormBuilder";
import { FormBuiderLayout } from "../../Hoc/Layouts";
import React, { Component } from "react";
import { connect } from "react-redux";
class Class extends Component {
  state = {
    currentEditor: null,
    formElements: [getDefaultElement()]
  };

  componentDidUpdate() {}

  addElement = type => {
    const position = this.state.formElements.length + 1;
    const { formElement } = generateNewElement(type, position);
    const formElements = [...this.state.formElements];
    formElements.push(formElement);
    this.setState({ formElements });
  };

  setElementName = (id, name) => {
    const elements = [...this.state.formElements];
    const elementIdex = elements.findIndex(el => el.id === id);
    if (elementIdex === -1) return;
    const element = elements[elementIdex];
    element.name = name;
    elements[elementIdex] = element;
    this.setState({ formElements: elements });
  };

  setElementChildren = (id, content) => {
    const elements = [...this.state.formElements];
    const elementIdex = elements.findIndex(el => el.id === id);
    if (elementIdex === -1) return;
    const element = elements[elementIdex];
    element.children = content;
    elements[elementIdex] = element;
    this.setState({ formElements: elements });
  };

  setCurrentEditor = editoRef => {
    // setTimeout(() => {
    //   editoRef.current.focus();
    // }, 1000);
  };

  addNextEditor = () => {
    const elements = [...this.state.formElements];
    const element = getDefaultElement();
    element.position = this.state.formElements.length + 1;
    elements.push(element);
    this.setState({ formElements: elements });
  };

  render() {
    return (
      <FormBuiderLayout>
        <FormBuilderView
          setElementChildren={this.setElementChildren}
          setElementName={this.setElementName}
          setCurrentEditor={this.setCurrentEditor}
          formElements={this.state.formElements}
          addNextEditor={this.addNextEditor}
          addElement={this.addElement}
        />
      </FormBuiderLayout>
    );
  }
}

export const FormBuilder = connect(
  null,
  null
)(Class);
