import Style from "./Loading.module.css";
import { Modal } from "..";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { endNotification } from "../../../store/actions/app";
import loadingIcon from "../../../img/loading2.svg";

class Class extends Component {
  render() {
    return (
      <Modal show={this.props.showLoadings}>
        <div className={Style.modalCont}>
          <h3 className={Style.modalHead}>Processing...</h3>
          <img src={loadingIcon} alt="processing..." className={Style.img} />
          <div className={Style.modalBody}>Just some seconds ...</div>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    showLoadings: state.app.loading
  };
};
const mapDispatchToProps = dispatch => ({
  closeNotification() {
    dispatch(endNotification());
  }
});

export const Loading = connect(
  mapStateToProps,
  mapDispatchToProps
)(Class);

Loading.propTypes = {
  toggleLoading: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired
};
