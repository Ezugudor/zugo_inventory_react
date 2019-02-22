import { fetchResponseByStatus, filterByDate } from "../../store/actions";
import { DashboardView } from "../../Components/Dashboard";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProcessedResponses,
  getUnreadResponses,
  getBusinessId
} from "../../store/selectors";

class Class extends Component {
  state = {
    endDate: "",
    startDate: ""
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
    this.setState({ endDate: "", startDate: "" });
  };

  render() {
    return (
      <DashboardView
        handleDateChange={this.handleDateChange}
        filterResponse={this.filterResponse}
        processed={this.props.processed}
        startDate={this.state.startDate}
        pending={this.props.pending}
        endDate={this.state.endDate}
      />
    );
  }
}

const mapStateToProps = state => ({
  processed: getProcessedResponses(state),
  pending: getUnreadResponses(state),
  businessId: getBusinessId(state)
});

export const Dashboard = connect(
  mapStateToProps,
  { fetchResponseByStatus, filterByDate }
)(Class);
