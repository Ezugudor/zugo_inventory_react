import Style from "./NotificationCard.module.css";
import { Modal } from "..";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { endCardNotification } from "../../../store/actions/app";
import loadingIcon from "../../../img/loading2.svg";

class Class extends Component {
  componentDidMount() {
    this.timeoutNotification();
  }

  componentDidUpdate() {
    this.timeoutNotification();
  }

  timeoutNotification() {
    if (this.props.showNotification === true) {
      setTimeout(
        function() {
          this.props.closeNotification();
        }.bind(this),
        this.props.notificationTimeout
      );
    }
  }

  render() {
    return (
      <div
        className={Style.modalCont}
        style={{
          visibility: this.props.showNotification ? "visible" : "hidden",
          opacity: this.props.showNotification ? 1 : 0
        }}
      >
        <h3 className={Style.modalHead}>{this.props.title}</h3>
        <div className={Style.modalBody}>{this.props.message}</div>
      </div>
    );
  }
}

// Notification.propTypes = {
//   toggleLoading: PropTypes.func.isRequired,
//   showLoading: PropTypes.bool.isRequired
// };

const mapStateToProps = state => {
  return {
    showNotification: state.app.showCardNotification,
    autoSaving: state.app.autoSaving,
    notificationTimeout: state.app.cardNotificationTimeout,
    title: state.app.cardNotificationTitle,
    message: state.app.cardNotificationMessage
  };
};

const mapDispatchToProps = dispatch => ({
  closeNotification() {
    dispatch(endCardNotification());
  }
});
export const NotificationCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Class);
