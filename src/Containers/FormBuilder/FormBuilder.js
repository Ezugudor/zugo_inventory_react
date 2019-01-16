import { getNextPosition, getDefaultElement, getChildIndex } from "../../utils";
import { generateNewElement, getIntroIndex, hasChild } from "../../utils";
import { getNewForm, getBuilderState } from "../../store/selectors";
import { preserveNewForm, createForm } from "../../store/actions";
import { preserveFormBuilderState } from "../../store/actions";
import { FormBuilderView } from "../../Components/FormBuilder";
import React, { Component } from "react";
import { slugName } from "../../utils";
import { connect } from "react-redux";

class Class extends Component {
  state = {
    settingsWindowName: "build",
    showSettingsWindow: true,
    currentElementType: "",
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

  /**
   * Add a new question to the list of questions for users to answer
   * @param {string} type type of question to ask
   */
  addElement = type => {
    const position = getNextPosition(this.state.formElements);
    const { formElement } = generateNewElement(type, position);
    const questions = [...this.state.formElements];
    const introIndex = getIntroIndex(questions);

    if (type === "introduction" && introIndex !== -1) {
      return this.setState({
        settingsWindowName: "configuration",
        currentElementType: formElement.type,
        currentElementId: formElement.id,
        showSettingsWindow: true
      });
    }

    questions.push(formElement);

    if (type === "introduction") {
      return this.setState({
        settingsWindowName: "configuration",
        currentElementType: formElement.type,
        currentElementId: formElement.id,
        showSettingsWindow: true,
        formElements: questions
      });
    }

    this.setState({
      currentElementId: formElement.id,
      formElements: questions
    });
  };

  /**
   * Set the text of the question to ask
   * @param {string} id id of the question whose text/name property is to be set
   * @param {string} text the question text to set
   */
  setElementName = (id, text) => {
    const elements = [...this.state.formElements];
    const elementIdex = elements.findIndex(el => el.id === id);
    if (elementIdex === -1) return;
    const element = elements[elementIdex];
    element.name = text;
    elements[elementIdex] = element;
    this.setState({
      currentElementType: element.type,
      formElements: elements,
      currentElementId: id
    });
    this.preserveState(element, elements);
  };

  /**
   * set the question text for form question with the given id
   * @param {string} id
   * @param {content} content the question text
   */
  setElementChildren = (id, content) => {
    const elements = [...this.state.formElements];
    const elementIdex = elements.findIndex(el => el.id === id);
    if (elementIdex === -1) return;
    const element = elements[elementIdex];
    element.children = content;
    elements[elementIdex] = element;
    this.setState({ formElements: elements });
    this.preserveState(element, elements);
  };

  /**
   * Add new intro section component like ID Cards
   * @param {object} child
   */
  addQuestionIntroChild = child => {
    const questions = [...this.state.formElements];
    const introIndex = getIntroIndex(questions);
    const questionIntro = questions[introIndex];
    if (hasChild(questionIntro, child.slug)) {
      const childIndex = getChildIndex(questionIntro, child.slug);
      questionIntro.children.splice(childIndex, 1);
    } else {
      questionIntro.children.push(child);
    }
    this.setState({ formElements: questions });
    this.preserveState(questionIntro, questions);
  };

  /**
   * Add valiation rules to a form element being build by a user
   * @param name // name of rule
   * @param e // e object representing user action
   */
  addValidationRule = (name, e) => {
    const { currentElementId } = this.state;
    const elements = [...this.state.formElements];
    const elementIdex = elements.findIndex(el => el.id === currentElementId);
    if (elementIdex === -1) return;
    const element = elements[elementIdex];
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const rules = [...element.validationRules];
    const ruleIndex = rules.findIndex(rule => rule.name === name);
    if (ruleIndex !== -1) {
      rules[ruleIndex] = { name, value };
    } else {
      rules.push({ name, value });
    }

    element.validationRules = rules;
    elements[elementIdex] = element;

    const stateToPreserve = { ...this.state };
    delete stateToPreserve.formElements;

    this.props.preserveNewForm(elements);
    this.props.preserveFormBuilderState(stateToPreserve);
    this.setState({ formElements: elements });
  };

  /**
   * Delete a question from form elements
   * @param {string} questionId
   */
  deleteQuestion = questionId => {
    const questions = [...this.state.formElements];
    const questionIndex = questions.findIndex(el => el.id === questionId);
    if (questionIndex === -1) return;
    const question = questions.splice(questionIndex, 1);
    this.preserveState(question, questions);
    this.setState({
      formElements: questions,
      settingsWindowName: "build"
    });
  };

  /**
   * save state to local storage
   * @param {object} currentQuestion question beign edited
   * @param {array} questions form questions
   */
  preserveState = (currentQuestion, questions) => {
    const stateToPreserve = { ...this.state };
    stateToPreserve.currentElementType = currentQuestion.type;
    stateToPreserve.currentElementId = currentQuestion.id;
    delete stateToPreserve.formElements;

    this.props.preserveNewForm(questions);
    this.props.preserveFormBuilderState(stateToPreserve);
  };

  /**
   * Add another editor to the UI for collecting more questions
   */
  addNextEditor = () => {
    const elements = [...this.state.formElements];
    const element = getDefaultElement();
    element.position = this.state.formElements.length + 1;
    elements.push(element);
    this.setState({ formElements: elements });
  };

  /**
   * send the questions user want to ask to the backend server
   */
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
        currentElementType={this.state.currentElementType}
        addQuestionIntroChild={this.addQuestionIntroChild}
        changeConfigWindow={this.changeConfigWindow}
        toggleConfigWindow={this.toggleConfigWindow}
        setElementChildren={this.setElementChildren}
        addValidationRule={this.addValidationRule}
        setCurrentEditor={this.setCurrentEditor}
        formElements={this.state.formElements}
        deleteQuestion={this.deleteQuestion}
        setElementName={this.setElementName}
        formName={this.props.newForm.name}
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
