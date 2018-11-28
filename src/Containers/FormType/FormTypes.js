import { Cards, Controls } from "../../Components/FormTypes";
import { fetchWorkspaces } from "../../store/actions";
import { Adminlayout } from "../../Hoc/Layouts";
import React, { Component } from "react";
import { chunkData } from "../../utils";
import { slugName } from "../../utils";
import { connect } from "react-redux";
class Class extends Component {
  componentDidMount() {
    const business = this.props.business;
    this.props.fetchWorkspaces(business.id);
  }

  goToForms = formType => {
    const { parent, name } = formType;
    const path = this.props.match.path;
    const url = `${path}/${slugName(parent)}/${slugName(name)}`;
    this.props.history.push(url, { params: formType });
  };

  render() {
    return (
      <Adminlayout pageName="formType">
        <div className="formType">
          <Controls />
          <Cards
            formTypes={chunkData(this.props.all.Individual, 4)}
            viewForms={this.goToForms}
          />
        </div>
      </Adminlayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    business: state.user.business,
    loading: state.app.loading,
    all: state.workspace.all
  };
};

export const FormTypes = connect(
  mapStateToProps,
  { fetchWorkspaces }
)(Class);
