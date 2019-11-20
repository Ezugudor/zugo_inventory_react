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
  getBusinessColor,
  getProgressIndicator
} from "../../store/selectors";
import { themeMaker } from "../../utils";

class Class extends Component {
  state = {
    endDate: "",
    startDate: "",
    responseTabToShow: "pending",
    showNotification: false,
    showLoading: false
  };

  /**
   * open and close the the progress ui
   */
  toggleLoading = () => {
    this.setState(prevState => ({
      showLoading: !prevState.showLoading
    }));
  };

  switchResponseTab = tabName => {
    this.setState({ responseTabToShow: tabName });
  };

  handleDateChange = e => {
    console.log("changed date filter", e.target.dataset);
    const data = e.target.dataset;
    const state = { ...this.state };
    const val = e.target.value;
    console.log("value checking if empoty", val == "");
    state[data.dateType] = val;
    this.setState(state);
    let nonEmpty = 0;
    const elems = document.querySelectorAll("input[type=date]");
    elems.forEach(elem => {
      if (elem.value !== "") {
        nonEmpty++;
      }
    });

    if (nonEmpty === 0) {
      //timeout function is important important
      setTimeout(() => {
        this.filterResponse();
      }, 10);
    }
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
    if (startDate > endDate) {
      alert("Wrong date range selected", "error");
      return;
    }
    console.log("progress indicator", this.props.progress);
    // this.toggleLoading();
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
        showLoading={this.props.progress}
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
  businessColor: getBusinessColor(state),
  progress: getProgressIndicator(state)
});

export const Dashboard = connect(
  mapStateToProps,
  { fetchResponseByStatus, filterByDate }
)(Class);
