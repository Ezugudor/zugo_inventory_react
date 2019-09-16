import { fetchResponseByStatus, filterByDate } from "../../store/actions";
import { DashboardView } from "../../Components/Dashboard";
import React, { Component } from "react";
import { getCurrentUser } from "../../store/selectors";
import { connect } from "react-redux";
import {
  getPartiallyProcessedResponses,
  getProcessedResponses,
  getUnreadResponses,
  getBusinessId,
  getBusinessColor
} from "../../store/selectors";
import { themeMaker } from "../../utils";

class Class extends Component {
  state = {
    endDate: "",
    startDate: "",
    responseTabToShow: "pending",
    showNotification: false
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
    const { businessId, businessColor } = this.props;
    themeMaker(businessColor);
    this.props.fetchResponseByStatus(businessId);
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
        showNotification={this.state.showNotification}
        popupTimer={this.popupTimer}
      />
    );
  }
}

const mapStateToProps = state => ({
  partiallyProcessed: getPartiallyProcessedResponses(state),
  processed: getProcessedResponses(state),
  pending: getUnreadResponses(state),
  currentUser: getCurrentUser(state),
  businessId: getBusinessId(state),
  businessColor: getBusinessColor(state)
});

export const Dashboard = connect(
  mapStateToProps,
  { fetchResponseByStatus, filterByDate }
)(Class);
