import {
  ItemConfiguration,
  IntroConfiguration,
  BranchConfiguration,
  AddressConfiguration
} from "./Config";
import Style from "./ConfigCurrentElem.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { endNotification } from "../../../store/actions/app";
import loadingIcon from "../../../img/loading2.svg";

class Class extends Component {
  render() {
    return (
      <Modal
        show={this.props.showConfigModal}
        click={this.props.toggleConfigModal}
      >
        <div className={Style.contentWrapper}>
          {this.props.currentElement.type === "introduction" ? (
            <IntroConfiguration
              addQuestionIntroChild={this.props.addQuestionIntroChild}
              isChecked={this.props.isChecked}
              currentElement={this.props.currentElement}
            />
          ) : this.props.currentElement.type === "address" ? (
            <AddressConfiguration
              addCompactQuestionChild={this.props.addCompactQuestionChild}
              currentElement={this.props.currentElement}
            />
          ) : this.props.currentElement.type === "branch" ? (
            <BranchConfiguration
              addCompactQuestionChild={this.props.addCompactQuestionChild}
              currentElement={this.props.currentElement}
            />
          ) : this.props.currentElement.type ? (
            <div>
              <ItemConfiguration
                setQuestionProperty={this.props.setQuestionProperty}
                addValidationRule={this.props.addValidationRule}
                currentElement={this.props.currentElement}
              />
            </div>
          ) : (
            <p>You have no question to configure</p>
          )}
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
    title: state.app.notificationTitle,
    message: state.app.notificationMessage
  };
};
const mapDispatchToProps = dispatch => ({
  closeNotification() {
    dispatch(endNotification());
  }
});

export const ConfigCurrentElem = connect(
  mapStateToProps,
  mapDispatchToProps
)(Class);
