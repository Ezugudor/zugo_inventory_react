import { getBusinessSlug, getUploadedFileData } from "../../store/selectors";
import { BusinessSettingsView } from "../../Components/BusinessSettings";
import { updateUploadStatus, updateDetails } from "../../store/actions";
import { getUploadStatus, getBusinessId } from "../../store/selectors";
import { uploadFile } from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";

class Class extends Component {
  state = {
    dragEnter: false,
    businessDescription: ""
  };

  highlightDropArea = e => {
    e.preventDefault();
    this.setState({ dragEnter: true });
  };

  unhighlightDropArea = e => {
    this.setState({ dragEnter: false });
  };

  handleFileDrop = e => {
    e.preventDefault();
    const dt = e.dataTransfer;
    this.uploadLogo(dt.files);
    this.setState({ dragEnter: false });
  };

  /**
   * set value of business description
   * @param {eventObject} e
   */
  handleDescriptionChange = e => {
    this.setState({ businessDescription: e.target.value });
  };

  /**
   * send file to be uploaded to S3 bucket
   * @param {object} file file to be uploaded
   */
  uploadLogo = file => {
    const formData = new FormData();
    const fileName = `${this.props.businessSlug}logo`;
    formData.append("logo", file);
    this.props.updateUploadStatus("uploading");
    this.props.uploadFile("logo", formData, fileName);
  };

  /**
   * send bank logoUrl and description data to the backend server
   */
  updateBusinessDetails = () => {
    if (!this.props.uploadedFile) {
      return alert("Try again when logo is done processing");
    }
    const details = {
      description: this.state.businessDescription,
      logoUrl: this.props.uploadedFile.imageUrl,
      id: this.props.businessId
    };
    this.props.updateDetails(details, this.props.history);
  };

  render() {
    return (
      <BusinessSettingsView
        businessDescription={this.state.businessDescription}
        updateBusinessDetails={this.updateBusinessDetails}
        changeDescription={this.handleDescriptionChange}
        unhighlightDropArea={this.unhighlightDropArea}
        highlightDropArea={this.highlightDropArea}
        uploadStatus={this.props.uploadStatus}
        handleFileDrop={this.handleFileDrop}
        dragEnter={this.state.dragEnter}
        handleUpload={this.uploadLogo}
      />
    );
  }
}

const mapStateToProps = state => ({
  uploadedFile: getUploadedFileData(state),
  businessSlug: getBusinessSlug(state),
  uploadStatus: getUploadStatus(state),
  businessId: getBusinessId(state)
});

export const BusinessSettings = connect(
  mapStateToProps,
  { uploadFile, updateUploadStatus, updateDetails }
)(Class);
