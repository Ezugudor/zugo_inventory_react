import {
  startNewForm,
  fetchForms,
  editForm,
  clearFormBuilder,
  deleteForm
} from "../../store/actions";
import {
  getAllForms,
  getBusinessId,
  getCurrentUser,
  getBusinessColor,
  getProgressIndicator
} from "../../store/selectors";
import { FormsView } from "../../Components/Forms";
import React, { Component } from "react";
import { connect } from "react-redux";
import { themeMaker } from "../../utils";

export class Class extends Component {
  state = {
    showNewForm: false,
    showDeleteModal: false,
    formToDelete: {},
    editMode: false,
    newFormName: "",
    showNotification: false
  };

  componentWillMount() {
    this.formType = this.props.history.location.state.params;
  }

  componentDidMount() {
    const { businessId, businessColor } = this.props;
    this.props.fetchForms(this.formType.id, businessId);
    themeMaker(businessColor);
  }

  setNewFormName = e => {
    this.setState({ newFormName: e.target.value });
  };

  popupTimer = props => {
    if (props.closeTime) {
      setTimeout(() => {
        this.toggleNotification();
      }, props.closeTime);
    }
  };

  toggleEditMode = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  };
  /**
   * open and close the the progress ui
   */

  toggleNotification = () => {
    this.setState(prevState => ({
      showNotification: !prevState.showNotification
    }));
  };

  toggleNewForm = () => {
    this.setState(prevState => ({
      showNewForm: !prevState.showNewForm
    }));
  };

  setFormToDelete = form => {
    this.setState({ formToDelete: form });
    this.toggleDelete();
  };

  toggleDelete = () => {
    this.setState(prevState => ({
      showDeleteModal: !prevState.showDeleteModal
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

    return form;
  };

  deleteForm = () => {
    this.toggleDelete();
    const user = this.props.currentUser;
    const business = this.props.businessId;
    const { formToDelete } = this.state;
    const { id: formId, workspace } = formToDelete;
    this.props.deleteForm(formId, { user, business, workspace });
  };

  goToFormBuilderEdit = (formId, workSpaceId) => {
    const selectedForm = this.getForm(formId, workSpaceId, this.props.forms);
    const details = {
      formType: this.formType,
      name: selectedForm.name,
      elements: selectedForm.elements,
      formId
    };

    this.props.editForm(details);
    this.props.history.push("/formbuilder", { params: details });
  };

  render() {
    const forms = this.props.forms[this.formType.id];
    return (
      <FormsView
        showNewForm={this.state.showNewForm}
        editMode={this.state.editMode}
        toggleEditMode={this.toggleEditMode}
        toggleDelete={this.toggleDelete}
        showDeleteModal={this.state.showDeleteModal}
        formToDelete={this.state.formToDelete}
        setFormToDelete={this.setFormToDelete}
        showBuilder={this.goToFormBuilder}
        showBuilderEdit={this.goToFormBuilderEdit}
        toggleNewForm={this.toggleNewForm}
        handleInput={this.setNewFormName}
        name={this.state.newFormName}
        formType={this.formType}
        forms={forms}
        currentUser={this.props.currentUser}
        deleteForm={this.deleteForm}
        showLoading={this.props.progress}
      />
    );
  }
}
const mapStateToProps = state => ({
  businessId: getBusinessId(state),
  businessColor: getBusinessColor(state),
  currentUser: getCurrentUser(state),
  forms: getAllForms(state),
  progress: getProgressIndicator(state)
});
export const Form = connect(
  mapStateToProps,
  { startNewForm, fetchForms, editForm, deleteForm, clearFormBuilder }
)(Class);
