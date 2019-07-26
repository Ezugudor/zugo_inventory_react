import {
  generateNewQuestion,
  getIntroIndex,
  hasChild,
  resetPosition
} from "../../utils";
import { generateBankLocationQuestion, hasQuestion } from "../../utils";
import { getNewForm, getBuilderState } from "../../store/selectors";
import { preserveNewForm, createForm } from "../../store/actions";
import { preserveFormBuilderState } from "../../store/actions";
import { FormBuilderView } from "../../Components/FormBuilder";
import { getNextPosition, getChildIndex } from "../../utils";
import { getBranches } from "../../store/selectors";
import React, { Component } from "react";
import { slugName } from "../../utils";
import { connect } from "react-redux";

class Class extends Component {
  state = {
    settingsWindowName: "build",
    showSettingsWindow: true,
    showLoading: false,
    currentElement: {},
    formElements: []
  };

  /**
   * hidrate state from local storage
   */
  componentDidMount() {
    let stateUpdates = {};
    if (this.props.newForm.elements.length) {
      stateUpdates.formElements = this.props.newForm.elements;
    }

    if (this.props.builderState.currentElement.type) {
      stateUpdates = { ...stateUpdates, ...this.props.builderState };
    }
    this.setState(stateUpdates);
  }

  /**
   * change the setting UI from design to configuration mode
   */
  changeConfigWindow = name => {
    this.setState({
      showSettingsWindow: true,
      settingsWindowName: name
    });
  };

  /**
   * open and close the settings UI
   */
  toggleConfigWindow = () => {
    this.setState(prevState => ({
      showSettingsWindow: !prevState.showSettingsWindow
    }));
  };

  /**
   * open and close the the progress ui
   */
  toggleLoading = () => {
    this.setState(prevState => ({
      showLoading: !prevState.showLoading
    }));
  };
  /**
   * Add a new question to the list of questions for users to answer
   * @param {string} type type of question to ask
   */
  addElement = type => {
    console.dir("getting the states of the elements", this.state);
    const position = getNextPosition(this.state.formElements);
    console.dir(this.props.branches);
    const question = generateNewQuestion(type, position, this.props.branches);
    const questions = [...this.state.formElements];
    const introIndex = getIntroIndex(questions);

    if (type === "introduction" && introIndex !== -1) {
      return this.setState({
        settingsWindowName: "configuration",
        currentElement: question,
        showSettingsWindow: true
      });
    }

    questions.push(question);

    if (type === "introduction") {
      return this.setState({
        settingsWindowName: "configuration",
        currentElement: question,
        showSettingsWindow: true,
        formElements: questions
      });
    }

    this.setState({
      currentElement: question,
      formElements: questions
    });
  };

  /**
   * Set the text of the question to ask
   * @param {string} id id of the question whose property is to be set
   * @param {string} value the property value to set
   */
  setQuestionProperty = (name, id, value) => {
    const questions = [...this.state.formElements];
    const questionIdex = questions.findIndex(el => el.id === id);
    if (questionIdex === -1) return;
    const question = questions[questionIdex];
    question[name] = value;
    questions[questionIdex] = question;
    this.preserveState(question, questions);
    this.setState({
      currentElement: question,
      formElements: questions
    });
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
    const { currentElement } = this.state;
    if (!currentElement.type) return; // no question to configure

    const elements = [...this.state.formElements];
    const elementIdex = elements.findIndex(el => el.id === currentElement.id);
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
    this.preserveState(element, elements);
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
    const resetQn = resetPosition(questions);
    this.preserveState(question, resetQn);
    this.setState({
      formElements: resetQn,
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
    stateToPreserve.currentElement = currentQuestion;
    delete stateToPreserve.formElements;

    this.props.preserveNewForm(questions);
    this.props.preserveFormBuilderState(stateToPreserve);
  };

  /**
   * send the questions user want to ask to the backend server
   */
  createForm = () => {
    //popup the progress indicator
    this.toggleLoading();

    const { name, parent, id } = this.props.newForm.formType;
    const questions = this.state.formElements;

    // const branchQuestion = generateBankLocationQuestion(
    //   getNextPosition(this.state.formElements),
    //   this.props.branches
    // );
    // const hasBeenAsked = hasQuestion(questions, branchQuestion.name);
    // if (!hasBeenAsked) {
    //   questions.push(branchQuestion);
    // }

    const details = {
      name: this.props.newForm.name,
      elements: questions,
      formTypeId: id
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
        addQuestionIntroChild={this.addQuestionIntroChild}
        setQuestionProperty={this.setQuestionProperty}
        changeConfigWindow={this.changeConfigWindow}
        toggleConfigWindow={this.toggleConfigWindow}
        setElementChildren={this.setElementChildren}
        addValidationRule={this.addValidationRule}
        currentElement={this.state.currentElement}
        setCurrentEditor={this.setCurrentEditor}
        formElements={this.state.formElements}
        deleteQuestion={this.deleteQuestion}
        formName={this.props.newForm.name}
        addElement={this.addElement}
        save={this.createForm}
        showLoading={this.state.showLoading}
        toggleLoading={this.toggleLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  builderState: getBuilderState(state),
  branches: getBranches(state),
  newForm: getNewForm(state)
});

export const FormBuilder = connect(
  mapStateToProps,
  { preserveNewForm, createForm, preserveFormBuilderState }
)(Class);
