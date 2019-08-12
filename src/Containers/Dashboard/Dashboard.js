import { fetchResponseByStatus, filterByDate } from "../../store/actions";
import { DashboardView } from "../../Components/Dashboard";
import React, { Component } from "react";
import { getCurrentUser } from "../../store/selectors";
import { connect } from "react-redux";
import {
  getPartiallyProcessedResponses,
  getProcessedResponses,
  getUnreadResponses,
  getBusinessId
} from "../../store/selectors";

class Class extends Component {
  state = {
    endDate: "",
    startDate: "",
    responseTabToShow: "pending"
  };

  switchResponseTab = tabName => {
    this.setState({ responseTabToShow: tabName });
  };

  handleDateChange = e => {
    const data = e.target.dataset;
    const state = { ...this.state };
    state[data.dateType] = e.target.value;
    this.setState(state);
  };

  componentDidMount() {
    const { businessId } = this.props;
    this.props.fetchResponseByStatus(businessId);
  }

  filterResponse = () => {
    const { startDate, endDate } = this.state;
    if (!startDate || !endDate || startDate > endDate) {
      alert("Wrong date range selected", "error");
      return;
    }
    const { businessId } = this.props;
    this.props.filterByDate(businessId, startDate, endDate);
    // this.setState({ endDate: "", startDate: "" });
  };

  render() {
    return (
      <DashboardView
        partiallyProcessed={this.props.partiallyProcessed}
        handleDateChange={this.handleDateChange}
        tabToShow={this.state.responseTabToShow}
        filterResponse={this.filterResponse}
        switchTab={this.switchResponseTab}
        processed={this.props.processed}
        startDate={this.state.startDate}
        pending={this.props.pending}
        endDate={this.state.endDate}
        currentUser={this.props.currentUser}
      />
    );
  }
}

const mapStateToProps = state => ({
  partiallyProcessed: getPartiallyProcessedResponses(state),
  processed: getProcessedResponses(state),
  pending: getUnreadResponses(state),
  currentUser: getCurrentUser(state),
  businessId: getBusinessId(state)
});

export const Dashboard = connect(
  mapStateToProps,
  { fetchResponseByStatus, filterByDate }
)(Class);
