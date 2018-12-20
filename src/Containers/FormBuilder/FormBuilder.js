import { getNewForm, getBuilderState } from "../../store/selectors";
import { preserveNewForm, createForm } from "../../store/actions";
import { preserveFormBuilderState } from "../../store/actions";
import { getNextPosition, getDefaultElement } from "../../utils";
import { FormBuilderView } from "../../Components/FormBuilder";
import { generateNewElement } from "../../utils";
import React, { Component } from "react";
import { slugName } from "../../utils";
import { connect } from "react-redux";

class Class extends Component {
  state = {
    settingsWindowName: "build",
    showSettingsWindow: true,
    currentElementId: "",
    formElements: []
  };

  componentDidMount() {
    let stateUpdates = {};
    if (this.props.newForm.elements.length) {
      stateUpdates.formElements = this.props.newForm.elements;
    }

    if (this.props.builderState.currentElementId) {
      stateUpdates = { ...stateUpdates, ...this.props.builderState };
    }
    this.setState(stateUpdates);
  }

  changeConfigWindow = name => {
    this.setState({
      showSettingsWindow: true,
      settingsWindowName: name
    });
  };

  toggleConfigWindow = () => {
    this.setState(prevState => ({
      showSettingsWindow: !prevState.showSettingsWindow
    }));
  };

  addElement = type => {
    const position = getNextPosition(this.state.formElements);
    const { formElement } = generateNewElement(type, position);
    const formElements = [...this.state.formElements];
    formElements.push(formElement);
    const stateToChange = { currentElementId: formElement.id, formElements };
    if (type === "introduction" || type === "section") {
      return this.setState(stateToChange);
    }
    this.setState({
      settingsWindowName: "configuration",
      currentElementId: formElement.id,
      showSettingsWindow: true,
      formElements
    });
  };

  setElementName = (id, name) => {
    const elements = [...this.state.formElements];
    const elementIdex = elements.findIndex(el => el.id === id);
    if (elementIdex === -1) return;
    const element = elements[elementIdex];
    element.name = name;
    elements[elementIdex] = element;

    const stateToPreserve = { ...this.state };
    delete stateToPreserve.formElements;

    this.props.preserveNewForm(elements);
    this.props.preserveFormBuilderState(stateToPreserve);

    this.setState({ formElements: elements });
  };

  setElementChildren = (id, content) => {
    const elements = [...this.state.formElements];
    const elementIdex = elements.findIndex(el => el.id === id);
    if (elementIdex === -1) return;
    const element = elements[elementIdex];
    element.children = content;
    elements[elementIdex] = element;
    this.props.preserveNewForm(elements);
    this.setState({ formElements: elements });
  };

  addValidationRule = (name, e) => {
    // prevent user from add rules that invalidate account and BvN, numbers
    console.log(name);
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

  createForm = () => {
    const { name, parent } = this.props.newForm.formType;

    const details = {
      formTypeId: this.props.newForm.formType.id,
      elements: this.props.newForm.elements,
      name: this.props.newForm.name
    };

    const to = `/formtypes/${slugName(parent)}/${slugName(name)}`;
    const request = {
      to,
      params: this.props.newForm.formType
    };
    const { history } = this.props;
    this.props.createForm(details, history, request);
  };

  render() {
    return (
      <FormBuilderView
        showSettingsWindow={this.state.showSettingsWindow}
        settingsWindowName={this.state.settingsWindowName}
        handleRequirementInput={this.addValidationRule}
        changeConfigWindow={this.changeConfigWindow}
        toggleConfigWindow={this.toggleConfigWindow}
        setElementChildren={this.setElementChildren}
        setCurrentEditor={this.setCurrentEditor}
        formElements={this.state.formElements}
        setElementName={this.setElementName}
        addNextEditor={this.addNextEditor}
        addElement={this.addElement}
        save={this.createForm}
      />
    );
  }
}

const mapStateToProps = state => ({
  builderState: getBuilderState(state),
  newForm: getNewForm(state)
});

export const FormBuilder = connect(
  mapStateToProps,
  { preserveNewForm, createForm, preserveFormBuilderState }
)(Class);
