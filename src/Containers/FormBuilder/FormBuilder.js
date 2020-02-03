import {
  generateNewQuestion,
  generateNewChildQuestion,
  generateRequiredChildren,
  getIntroIndex,
  hasChild,
  resetPosition
} from "../../utils";
import { generateBankLocationQuestion, hasQuestion } from "../../utils";
import {
  getNewForm,
  getBuilderState,
  getBusinessColor,
  getBusinessId,
  getProgressIndicator
} from "../../store/selectors";
import {
  preserveNewForm,
  createForm,
  updateForm,
  publishForm
} from "../../store/actions";
import { preserveFormBuilderState } from "../../store/actions";
import { FormBuilderView } from "../../Components/FormBuilder";
import { getNextPosition, getChildIndex } from "../../utils";
import { getBranches, getCurrentUser } from "../../store/selectors";
import store from "../../store";
import watch from "redux-watch";
import React, { Component } from "react";
import { slugName } from "../../utils";
import { connect } from "react-redux";
import { themeMaker } from "../../utils";
import $ from "jquery";
window.jQuery = $;
require("../../plugins/nicescrollbar/nicescroll.js");

class Class extends Component {
  state = {
    settingsWindowName: "build",
    showSettingsWindow: true,
    showLoading: false,
    currentElement: {},
    showConfigModal: false,
    showPreview: false,
    showPublish: false,
    showUnPublish: false,
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

    const { businessColor } = this.props;
    themeMaker(businessColor);

    const w = watch(store.getState, "form.newForm");
    const _this = this;
    store.subscribe(
      w((newVal, oldVal, objs) => {
        window.clearTimeout(window.autoSaveTimeout);
        window.autoSaveTimeout = setTimeout(function() {
          /**
           * @param false : Will save and PUBLISH the form but since FALSE, will Save only. i.e save as it is.
           * @param true : Auto save
           */
          _this.createForm(false, true);
        }, 3000);
      })
    );
  }

  handleDragStart = elem => {
    const dnd = { ...this.state.dnd };
    dnd.currentDraggedElement = elem;
    this.setState({
      dnd
    });
  };
  /**
   * change the setting UI from design to configuration mode
   */
  changeConfigWindow = name => {
    this.setState({
      showSettingsWindow: true,
      settingsWindowName: name
    });
  };

  // this.formType = this.props.history.location.state.params;
  /**
   * open and close the settings UI
   */
  toggleConfigWindow = () => {
    this.setState(prevState => ({
      showSettingsWindow: !prevState.showSettingsWindow
    }));
  };

  /**
   * perform the correct publish action
   */
  publishAction = () => {
    const user = this.props.currentUser;
    const business = this.props.businessId;
    const workspace = this.props.newForm.formType;
    const details = { user, business, workspace, goingLive: true };
    const formId = this.props.newForm.formId;

    if (this.props.newForm.isLive) {
      this.toggleUnPublish();
      details.goingLive = false;
      this.props.publishForm(formId, details);
      return;
    }
    this.togglePublish();
    this.props.publishForm(formId, details);
  };

  /**
   * open the appropriate Publish/Unpublish modal
   */
  toggleLiveStatus = e => {
    if (this.props.newForm.isLive) {
      this.toggleUnPublish();
      return;
    }
    this.togglePublish();
  };

  /**
   * open and close the Publish/Live UI
   */
  togglePublish = () => {
    this.setState(prevState => ({
      showPublish: !prevState.showPublish
    }));
  };

  /**
   * open and close the Publish/Live UI
   */
  toggleUnPublish = () => {
    this.setState(prevState => ({
      showUnPublish: !prevState.showUnPublish
    }));
  };

  /**
   * open and close the Preveiw UI
   */
  togglePreview = () => {
    this.setState(prevState => ({
      showPreview: !prevState.showPreview
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
   * open and close the the individual form compponent config modal ui
   */
  toggleConfigModal = () => {
    this.setState(prevState => ({
      showConfigModal: !prevState.showConfigModal
    }));
  };
  /**
   * Go back to Forms
   */
  backToForms = () => {
    const { history } = this.props;
    history.goBack();
  };
  /**
   * Add a new question to the list of questions for users to answer
   * @param {string} type type of question to ask
   */
  addElement = type => {
    const position = getNextPosition(this.state.formElements);
    const question = generateNewQuestion(type, position, this.props.branches);
    const questions = [...this.state.formElements];
    const introIndex = getIntroIndex(questions);

    if (type === "address" || type === "branch") {
      const { id: parentId } = question;
      const defaultChildren = generateRequiredChildren(
        type,
        position,
        parentId
      );
      defaultChildren.forEach(elem => {
        // elem.parent = parentId;
        question.children.push(elem);
      });
    }
    questions.push(question);

    const introExist = questions.find(e => e.type === "introduction");
    if (typeof introExist === "object" && type === "introduction") {
      return this.setState({
        currentElement: introExist,
        formElements: questions,
        showConfigModal: true
      });
    }

    if (type === "introduction" || type === "address" || type === "branch") {
      return this.setState({
        currentElement: question,
        formElements: questions,
        showConfigModal: true
      });
    }

    this.setState({
      currentElement: question,
      formElements: questions
    });

    document.querySelector(".overflow_scroll.auto_scroll").scrollBy(0, 100000);
  };

  /**
   * Set the text of the question to ask
   * @param {string} id id of the question whose property is to be set
   * @param {string} value the property value to set
   */
  setQuestionProperty = (name, id, value, parent = null) => {
    let cE = { ...this.state.currentElement };
    cE[name] = value;

    if (parent) {
      return this.setQuestionChildProperty(name, id, value, parent);
    }
    const questions = [...this.state.formElements];
    const questionIndex = questions.findIndex(el => el.id === id);
    if (questionIndex === -1) return;
    const question = questions[questionIndex];

    question[name] = value;
    questions[questionIndex] = question;

    this.preserveState(question, questions);
    this.setState({
      currentElement: cE,
      formElements: questions
    });
  };

  /**
   * Set the currentElement
   * @param {string} id id of the question whose property is to be set
   * @param {string} value the property value to set
   */
  setCurrentEditor = (id, parent = null) => {
    // console.log("form builder fE", this.state.formElements);
    if (parent) {
      return this.setCurrentEditorCompact(id, parent);
    }
    const questions = [...this.state.formElements];
    const questionIdex = questions.findIndex(el => el.id === id);
    if (questionIdex === -1) return;
    const question = questions[questionIdex];
    question.parent = null;
    this.setState({
      currentElement: question
    });

    // this.toggleConfigModal();
  };

  setCurrentEditorCompact = (id, parent) => {
    const allQuestions = [...this.state.formElements];
    const pQIndex = allQuestions.findIndex(el => el.id === parent);
    if (pQIndex === -1) return;
    const parentQuestion = allQuestions[pQIndex];
    const parentChildren = [...parentQuestion.children];
    const cQIndex = parentChildren.findIndex(el => el.id === id);
    const childQuestion = parentChildren[cQIndex];
    this.setState({
      currentElement: childQuestion
    });
    // this.toggleConfigModal();
  };

  /**
   * Handle text changing of child questions
   * @param {string} id id of the question whose property is to be set
   * @param {string} value the property value to set
   */
  setQuestionChildProperty = (name, id, value, parent) => {
    let cE = { ...this.state.currentElement };
    cE[name] = value;

    //avoid cyclic reference :Not using this again since parent flat id is now used
    // const { parent: parentElem } = cE;
    // cE.parent = { id: parentElem };

    const mainQuestions = [...this.state.formElements];
    const mQIndex = mainQuestions.findIndex(el => el.id === parent);
    const parentChildren = [...mainQuestions[mQIndex].children];

    const elemIndex = parentChildren.findIndex(el => el.id === id);
    parentChildren[elemIndex] = cE;
    mainQuestions[mQIndex].children = parentChildren;

    this.preserveState(cE, mainQuestions);
    this.setState({
      currentElement: cE,
      formElements: mainQuestions
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
    // alert("reached");
    const questions = [...this.state.formElements];
    const introIndex = getIntroIndex(questions);
    // let questionIntro = questions[introIndex];
    const questionIntro = { ...this.state.currentElement };

    if (hasChild(questionIntro, child.name)) {
      const childIndex = getChildIndex(questionIntro, child.name);
      questionIntro.children.splice(childIndex, 1);
    } else {
      questionIntro.children.push(child);
    }

    questions[introIndex] = questionIntro;
    this.preserveState(questionIntro, questions);

    this.setState({
      currentElement: questionIntro,
      formElements: questions
    });
  };

  /**
   * Add new Compact Question child
   * @param {object} child
   */
  addCompactQuestionChild = child => {
    const currentElement = { ...this.state.currentElement };

    // const childPosition = currentElement.position;
    const questions = [...this.state.formElements];

    if (hasChild(currentElement, child.name)) {
      const childIndex = getChildIndex(currentElement, child.name);
      currentElement.children.splice(childIndex, 1);
    } else {
      const position = getNextPosition(currentElement.children);
      const question = generateNewChildQuestion(
        child.type,
        position,
        this.props.branches,
        child,
        currentElement.type
      );
      question.parent = currentElement.id;
      currentElement.children.push(question);
    }

    this.setState({ formElements: questions, currentElement });
    this.preserveState(currentElement, questions);
  };

  /**
   * Actually adds the validation rules
   * @param name // name of rule
   * @param e // object representing user action
   */
  currentElementWithValidation = (name, e) => {
    const currentElement = { ...this.state.currentElement };
    const cERules = [...currentElement.validationRules];
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const ruleIndex = cERules.findIndex(rule => rule.name === name);
    if (ruleIndex !== -1) {
      cERules[ruleIndex] = { name, value };
    } else {
      cERules.push({ name, value });
    }
    currentElement.validationRules = cERules;
    return currentElement;
  };
  /**
   * Add valiation rules to a form element being build by a user
   * @param name // name of rule
   * @param e // e object representing user action
   */
  addValidationRule = (name, e) => {
    const currentElementV = this.currentElementWithValidation(name, e);
    if (!currentElementV.type) return; // no question to configure

    const elements = [...this.state.formElements];

    // if (elementIdex === -1) return;

    const { isCompact } = currentElementV;

    if (isCompact) {
      const elementIdex = elements.findIndex(
        el => el.id === currentElementV.parent
      );
      const parent = elements[elementIdex];
      const children = [...parent.children];
      const childIndex = children.findIndex(el => el.id === currentElementV.id);
      //rewrite the parent element to avoid cyclic reference by chosing what is needed(id)
      // const { parent: parentElem } = currentElementV;
      // currentElementV.parent = { id: parentElem.id };
      children[childIndex] = currentElementV;
      parent.children = children;

      elements[elementIdex] = parent;
    } else {
      const elementIdex = elements.findIndex(
        el => el.id === currentElementV.id
      );
      const { parent: undefined, ...others } = currentElementV;
      elements[elementIdex] = others;
    }

    this.preserveState(currentElementV, elements);
    this.setState({
      currentElement: currentElementV,
      formElements: elements
    });
  };

  /**
   * Delete a question from form elements
   * @param {string} questionId
   */
  deleteQuestion = (questionId, parent = null) => {
    if (parent) {
      this.deleteCompactChildQuestion(questionId, parent);
      return;
    }

    const questions = [...this.state.formElements];
    const questionIndex = questions.findIndex(el => el.id === questionId);
    if (questionIndex === -1) {
      return;
    }

    const question = questions.splice(questionIndex, 1);
    const resetQn = resetPosition(questions);
    this.preserveState(question, resetQn);
    this.setState({
      formElements: resetQn,
      settingsWindowName: "build"
    });
  };

  /**
   * Delete a question from form elements
   * @param {string} questionId
   */
  deleteCompactChildQuestion = (questionId, parent) => {
    const mainTree = [...this.state.formElements];
    const compactParent = mainTree.find(el => el.id === parent);
    const questions = [...compactParent.children];

    const questionIndex = questions.findIndex(el => el.id === questionId);
    if (questionIndex === -1) {
      return;
    }

    const question = questions.splice(questionIndex, 1);
    const resetQn = resetPosition(questions);

    compactParent.children = resetQn;
    let originalQuestionTree = this.state.formElements;

    const newFormElement = originalQuestionTree.map(el => {
      if (el.id === parent) {
        el.children = resetQn;
        return el;
      }
      return el;
    });

    originalQuestionTree = newFormElement;
    this.preserveState(question, newFormElement);

    this.setState({
      formElements: originalQuestionTree,
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
   * send the data the user have filled to the backend
   * @param publish if true , the form will be saved and PUBLISHED status set to true
   */
  createForm = (publish, autoSave) => {
    const { name, parent, id } = this.props.newForm.formType;
    const questions = this.state.formElements;
    const live = publish || this.props.newForm.isLive;
    const details = {
      name: this.props.newForm.name,
      elements: questions,
      formTypeId: id,
      formId: this.props.newForm.formId,
      publish: live
    };
    const to = `/formtypes/${slugName(parent)}/${slugName(name)}`;
    const request = {
      to,
      params: this.props.newForm.formType
    };
    const { history } = this.props;
    this.props.updateForm(details, history, request, autoSave);
  };

  updateElementOrder = result => {
    const elements = this.state.formElements;
    const { destination, source, draggableId } = result;

    const destElement = elements.find(
      elem => elem.position === destination.index
    );
    const destPosition = destElement.position;
    const destIndex = elements.findIndex(
      elem => elem.position === destination.index
    );

    const srcElement = elements.find(elem => elem.position === source.index);
    const srcPosition = srcElement.position;
    const srcIndex = elements.findIndex(elem => elem.position === source.index);

    destElement.position = srcPosition;
    destElement.qPosition = srcPosition;
    srcElement.position = destPosition;
    srcElement.qPosition = destPosition;

    // elements[destIndex] = srcElement;
    // elements[srcIndex] = destElement;

    const removeElem = elements.splice(srcIndex, 1);
    elements.splice(destIndex, 0, srcElement);
    this.preserveState(srcElement, elements);
    this.setState({ formElements: elements });
  };

  render() {
    return (
      <FormBuilderView
        updateElementOrder={this.updateElementOrder}
        isLive={this.props.newForm.isLive}
        showPublish={this.state.showPublish}
        showUnPublish={this.state.showUnPublish}
        togglePublish={this.togglePublish}
        toggleUnPublish={this.toggleUnPublish}
        toggleLiveStatus={this.toggleLiveStatus}
        publishAction={this.publishAction}
        showSettingsWindow={this.state.showSettingsWindow}
        backToForms={this.backToForms}
        showConfigModal={this.state.showConfigModal}
        showPreview={this.state.showPreview}
        settingsWindowName={this.state.settingsWindowName}
        addQuestionIntroChild={this.addQuestionIntroChild}
        isChecked={this.isChecked}
        addCompactQuestionChild={this.addCompactQuestionChild}
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
        form={this.props.newForm}
        addElement={this.addElement}
        save={this.createForm}
        showLoading={this.props.progress}
        toggleLoading={this.toggleLoading}
        toggleConfigModal={this.toggleConfigModal}
        togglePreview={this.togglePreview}
        currentUser={this.props.currentUser}
      />
    );
  }
}

const mapStateToProps = state => ({
  builderState: getBuilderState(state),
  currentUser: getCurrentUser(state),
  branches: getBranches(state),
  newForm: getNewForm(state),
  businessColor: getBusinessColor(state),
  businessId: getBusinessId(state),
  progress: getProgressIndicator(state)
});

export const FormBuilder = connect(
  mapStateToProps,
  {
    preserveNewForm,
    createForm,
    updateForm,
    preserveFormBuilderState,
    publishForm
  }
)(Class);
// const mapStateToProps = state => ({
//   partiallyProcessed: getPartiallyProcessedResponses(state),
//   processed: getProcessedResponses(state),
//   pending: getUnreadResponses(state),
//   currentUser: getCurrentUser(state),
//   businessId: getBusinessId(state),
//   businessColor: getBusinessColor(state)
// });
