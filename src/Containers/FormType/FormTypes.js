import { FormTypeView } from "../../Components/FormTypes";
import {
  getBusinessId,
  getCurrentUser,
  getBusinessColor
} from "../../store/selectors";
import { fetchWorkspaces } from "../../store/actions";
import React, { Component } from "react";
import { chunkData } from "../../utils";
import { slugName } from "../../utils";
import { connect } from "react-redux";
import { themeMaker } from "../../utils";

class Class extends Component {
  state = {
    tabToShow: "individual",
    showNotification: false
  };

  componentDidMount() {
    const { businessId, businessColor } = this.props;
    this.props.fetchWorkspaces(businessId);
    themeMaker(businessColor);
  }

  popupTimer = props => {
    if (props.closeTime) {
      setTimeout(() => {
        this.toggleNotification();
      }, props.closeTime);
    }
  };

  /**
   * open and close the the progress ui
   */
  toggleNotification = () => {
    this.setState(prevState => ({
      showNotification: !prevState.showNotification
    }));
  };
  switchTab = text => {
    text = text.replace(/\d/g, "").toLowerCase();
    this.setState({ tabToShow: text });
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
        currentUser={this.props.currentUser}
        showNotification={this.state.showNotification}
        popupTimer={this.popupTimer}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    businessId: getBusinessId(state),
    currentUser: getCurrentUser(state),
    businessColor: getBusinessColor(state),
    loading: state.app.loading,
    all: state.workspace.all
  };
};

export const FormTypes = connect(
  mapStateToProps,
  { fetchWorkspaces }
)(Class);
