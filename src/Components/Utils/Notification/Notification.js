import Style from "./Notification.module.css";
import { Modal } from "..";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { endNotification } from "../../../store/actions/app";
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
      <Modal
        show={this.props.showNotification}
        click={this.props.closeNotification}
      >
        <div className={Style.modalCont}>
          <h3 className={Style.modalHead}>{this.props.title}</h3>
          <div className={Style.modalBody}>{this.props.message}</div>
        </div>
      </Modal>
    );
  }
}

// Notification.propTypes = {
//   toggleLoading: PropTypes.func.isRequired,
//   showLoading: PropTypes.bool.isRequired
// };

const mapStateToProps = state => {
  return {
    showNotification: state.app.showNotification,
    notificationTimeout: state.app.notificationTimeout,
    title: state.app.notificationTitle,
    message: state.app.notificationMessage
  };
};
const mapDispatchToProps = dispatch => ({
  closeNotification() {
    dispatch(endNotification());
  }
});

export const Notification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Class);
