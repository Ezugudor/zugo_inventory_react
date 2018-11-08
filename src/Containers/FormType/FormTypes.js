import { Cards, Controls } from "../../Components/FormTypes";
import { fetchWorkspaces } from "../../store/actions";
import { Adminlayout } from "../../Hoc/Layouts";
import React, { Component } from "react";
import { connect } from "react-redux";
import { chunkData } from "../../utils";
class Class extends Component {
  componentDidMount() {
    const business = this.props.business;
    this.props.fetchWorkspaces(business.id);
  }

  render() {
    return (
      <Adminlayout pageName="formType">
        <div className="formType">
          <Controls />
          <Cards formTypes={chunkData(this.props.all.Individual, 4)} />
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
