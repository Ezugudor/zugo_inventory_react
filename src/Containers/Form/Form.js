import { Controls, NewForm, Cards } from "../../Components/Form";
import { Adminlayout } from "../../Hoc/Layouts";
import React, { Component } from "react";

export class Form extends Component {
  state = {
    showNewForm: false,
    newFormName: ""
  };

  componentDidMount() {}
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
    const formType = this.props.match.params;
    const details = { formType, name: this.state.newFormName };
    this.props.history.push("/formbuilder", { params: details });
  };

  render() {
    return (
      <Adminlayout>
        <div className="form">
          <Controls toggleNewForm={this.toggleNewForm} />
          <Cards />
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
