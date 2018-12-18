import { FormTypeView } from "../../Components/FormTypes";
import { fetchWorkspaces } from "../../store/actions";
import React, { Component } from "react";
import { chunkData } from "../../utils";
import { slugName } from "../../utils";
import { connect } from "react-redux";
class Class extends Component {
  state = {
    tabToShow: "individual"
  };

  componentDidMount() {
    const business = this.props.business;
    this.props.fetchWorkspaces(business.id);
  }

  switchTab = e => {
    const content = e.target.textContent.replace(/\d/g, "").toLowerCase();
    this.setState({ tabToShow: content });
  };

  goToForms = formType => {
    const { parent, name } = formType;
    const path = this.props.match.path;
    const url = `${path}/${slugName(parent)}/${slugName(name)}`;
    this.props.history.push(url, { params: formType });
  };

  getData() {
    if (this.state.tabToShow === "individual") {
      return chunkData(this.props.all.Individual, 4);
    } else {
      return chunkData(this.props.all.Corporate, 4);
    }
  }

  render() {
    return (
      <FormTypeView
        selectedTab={this.state.tabToShow}
        formTypes={this.getData()}
        switchTab={this.switchTab}
        viewForms={this.goToForms}
      />
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
