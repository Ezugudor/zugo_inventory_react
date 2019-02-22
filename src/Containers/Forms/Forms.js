import { startNewForm, fetchForms } from "../../store/actions";
import { getAllForms, getBusinessId } from "../../store/selectors";
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
    const details = { formType: this.formType, name: this.state.newFormName };
    this.props.startNewForm(details);
    this.props.history.push("/formbuilder", { params: details });
  };

  render() {
    const forms = this.props.forms[this.formType.id];
    return (
      <FormsView
        showNewForm={this.state.showNewForm}
        showBuilder={this.goToFormBuilder}
        toggleNewForm={this.toggleNewForm}
        handleInput={this.setNewFormName}
        name={this.state.newFormName}
        formType={this.formType}
        forms={forms}
      />
    );
  }
}
const mapStateToProps = state => ({
  businessId: getBusinessId(state),
  forms: getAllForms(state)
});
export const Form = connect(
  mapStateToProps,
  { startNewForm, fetchForms }
)(Class);
