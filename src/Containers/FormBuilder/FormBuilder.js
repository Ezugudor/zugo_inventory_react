import { getDefaultElement, generateNewElement } from "../../utils";
import { preserveNewForm, createForm } from "../../store/actions";
import { FormBuilderView } from "../../Components/FormBuilder";
import { FormBuiderLayout } from "../../Hoc/Layouts";
import { getNewForm } from "../../store/selectors";
import { slugName } from "../../utils";
import React, { Component } from "react";
import { connect } from "react-redux";
class Class extends Component {
  state = {
    showSettingsWindow: false,
    settingsWindowName: "",
    formElements: [getDefaultElement()]
  };

  componentDidMount() {
    if (this.props.newForm.elements.length) {
      this.setState({ formElements: this.props.newForm.elements });
    }
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
    this.props.preserveNewForm(elements);
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
      <FormBuiderLayout
        changeConfigWindow={this.changeConfigWindow}
        save={this.createForm}
      >
        <FormBuilderView
          toggleConfigWindow={this.toggleConfigWindow}
          setElementChildren={this.setElementChildren}
          setCurrentEditor={this.setCurrentEditor}
          formElements={this.state.formElements}
          setElementName={this.setElementName}
          addNextEditor={this.addNextEditor}
          addElement={this.addElement}
        />
      </FormBuiderLayout>
    );
  }
}

const mapStateToProps = state => ({ newForm: getNewForm(state) });
export const FormBuilder = connect(
  mapStateToProps,
  { preserveNewForm, createForm }
)(Class);
