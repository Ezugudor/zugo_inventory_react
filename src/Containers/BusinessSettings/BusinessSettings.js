import { getBusinessSlug, getUploadedFileData } from "../../store/selectors";
import { BusinessSettingsView } from "../../Components/BusinessSettings";
import {
  getUploadStatus,
  getBusinessId,
  getBusinessColor
} from "../../store/selectors";
import { updateDetails } from "../../store/actions";
import { uploadLogo } from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Loading } from "../../Components/Utils";
import { themeMaker } from "../../utils";

class Class extends Component {
  state = {
    businessDescription: "",
    loading: 0,
    showNotification: false,
    logoUrl: ""
  };

  componentDidMount() {
    const { businessColor } = this.props;
    themeMaker(businessColor);
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
    this.props.uploadLogo(formData, fileName, this).then(() => {
      this.setState({ logoUrl: this.props.uploadedFile.imageUrl });
    });
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
        handleUpload={this.uploadLogo}
        progress={this.state.loading}
        logoUrl={this.state.logoUrl}
        showNotification={this.state.showNotification}
        popupTimer={this.popupTimer}
      />
    );
  }
}

const mapStateToProps = state => ({
  uploadedFile: getUploadedFileData(state),
  businessSlug: getBusinessSlug(state),
  uploadStatus: getUploadStatus(state),
  businessId: getBusinessId(state),
  businessColor: getBusinessColor(state)
});

export const BusinessSettings = connect(
  mapStateToProps,
  { uploadLogo, updateDetails }
)(Class);
