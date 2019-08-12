import {
  startNewForm,
  fetchForms,
  editForm,
  clearFormBuilder
} from "../../store/actions";
import {
  getAllForms,
  getBusinessId,
  getCurrentUser
} from "../../store/selectors";
import { FormsView } from "../../Components/Forms";
import React, { Component } from "react";
import { connect } from "react-redux";

export class Class extends Component {
  state = {
    showNewForm: false,
    newFormName: ""
  };

  componentWillMount() {
    this.formType = this.props.history.location.state.params;
  }

  componentDidMount() {
    const { businessId } = this.props;
    this.props.fetchForms(this.formType.id, businessId);
  }

  setNewFormName = e => {
    this.setState({ newFormName: e.target.value });
  };

  toggleNewForm = () => {
    this.setState(prevState => ({
      showNewForm: !prevState.showNewForm
    }));
  };

  goToFormBuilder = () => {
    if (!this.state.newFormName) return;
    this.props.clearFormBuilder();
    const details = { formType: this.formType, name: this.state.newFormName };
    this.props.startNewForm(details);
    this.props.history.push("/formbuilder", { params: details });
  };

  getForm = (formId, workspace, forms) => {
    let workspaceForms = forms[workspace];
    let form = workspaceForms.find(elem => elem.id == formId);
    // console.log("returned workspace", workspaceForms);
    // console.log("returned form", form);
    return form;
  };

  goToFormBuilderEdit = (formId, workSpaceId) => {
    // console.log("id", formId);
    // console.log("workspace", workSpaceId);
    // console.log("edit state", this.state);
    // console.log("edit props", this.props);
    const selectedForm = this.getForm(formId, workSpaceId, this.props.forms);
    const details = {
      formType: this.formType,
      name: selectedForm.name,
      elements: selectedForm.elements,
      formId
    };
    // console.log("returned details", details);
    this.props.editForm(details);
    this.props.history.push("/formbuilder", { params: details });
  };

  render() {
    const forms = this.props.forms[this.formType.id];
    return (
      <FormsView
        showNewForm={this.state.showNewForm}
        showBuilder={this.goToFormBuilder}
        showBuilderEdit={this.goToFormBuilderEdit}
        toggleNewForm={this.toggleNewForm}
        handleInput={this.setNewFormName}
        name={this.state.newFormName}
        formType={this.formType}
        forms={forms}
        currentUser={this.props.currentUser}
      />
    );
  }
}
const mapStateToProps = state => ({
  businessId: getBusinessId(state),
  currentUser: getCurrentUser(state),
  forms: getAllForms(state),
  statea: state
});
export const Form = connect(
  mapStateToProps,
  { startNewForm, fetchForms, editForm, clearFormBuilder }
)(Class);
