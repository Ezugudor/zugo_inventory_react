import Style from "./PopImage.module.css";
import { Modal } from "..";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { endPreviewImage } from "../../../store/actions/app";
import {
  getImagePreviewStatus,
  getImagePreviewUrl,
  getImagePreviewTitle
} from "../../../store/selectors";
import loadingIcon from "../../../img/loading2.svg";

class Class extends Component {
  render() {
    return (
      <Modal show={this.props.previewState} click={this.props.closePreview}>
        <div className={Style.modalCont}>
          <h3 className={Style.modalHead}>{this.props.imageTitle}</h3>
          <img
            src={this.props.imageURL}
            alt="user Image"
            className={Style.img}
          />
          {/* <div className={Style.modalBody}>Just some seconds ...</div> */}
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  imageTitle: getImagePreviewTitle(state),
  imageURL: getImagePreviewUrl(state),
  previewState: getImagePreviewStatus(state)
});
const mapDispatchToProps = dispatch => ({
  closePreview() {
    dispatch(endPreviewImage());
  }
});

export const PopImage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Class);

PopImage.propTypes = {
  toggleLoading: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired
};
