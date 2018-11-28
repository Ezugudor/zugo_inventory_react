import { Controls, NewForm, Cards } from "../../Components/Form";
import { startNewForm, fetchForms } from "../../store/actions";
import { getAllForms } from "../../store/selectors";
import { Adminlayout } from "../../Hoc/Layouts";
import React, { Component } from "react";
import { connect } from "react-redux";
import { chunkData } from "../../utils";

export class Class extends Component {
  state = {
    showNewForm: false,
    newFormName: ""
  };

  componentWillMount() {
    this.formType = this.props.history.location.state.params;
  }

  componentDidMount() {
    this.props.fetchForms(this.formType.id);
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
      <Adminlayout>
        <div className="form">
          <Controls toggleNewForm={this.toggleNewForm} />
          <Cards forms={chunkData(forms, 4)} />
          <NewForm
            showNewForm={this.state.showNewForm}
            showBuilder={this.goToFormBuilder}
            toggleNewForm={this.toggleNewForm}
            onChange={this.setNewFormName}
            name={this.state.newFormName}
          />
        </div>
      </Adminlayout>
    );
  }
}
const mapStateToProps = state => ({
  forms: getAllForms(state)
});
export const Form = connect(
  mapStateToProps,
  { startNewForm, fetchForms }
)(Class);
