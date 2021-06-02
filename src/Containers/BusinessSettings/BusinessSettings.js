import { getBusinessSlug, getUploadedFileData } from "../../store/selectors";
import { BusinessSettingsView } from "../../Components/BusinessSettings";
import {
  getUploadStatus,
  getBusinessId,
  getBusinessById,
  getBusinessColor,
  getProgressIndicator
} from "../../store/selectors";
import { updateDetails } from "../../store/actions";
import { uploadLogo } from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { themeMaker } from "../../utils";

class Class extends Component {
  state = {
    businessDescription: "",
    businessDescCount: 200,
    loading: 0,
    showNotification: false,
    logoUrl: "",
    businessDetails: {},
    newBusinessDetails: {}
  };

  componentDidMount() {
    const { businessColor } = this.props;
    themeMaker(businessColor);

    // Hydrate editDetails
    const details = {
      ...this.state.businessDetails,
      ...this.props.businessById
    };
    this.setState({ businessDetails: details });
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
    const newCount = e.target.maxLength - e.target.value.length;
    this.setState({
      businessDescription: e.target.value,
      businessDescCount: newCount
    });
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
      const bizDetails = { ...this.state.businessDetails };
      bizDetails.logo_url = this.props.uploadedFile.imageUrl;
      this.setState({ businessDetails: bizDetails });
    });
  };

  /**
   * send bank logoUrl and description data to the backend server
   */
  updateBusinessDetails = () => {
    if (!this.props.uploadedFile && this.props.uploadStatus == "uploading") {
      return alert("Try again when logo is done processing");
    }
    const {
      color,
      description,
      logo_url,
      name,
      id
    } = this.state.businessDetails;
    const details = {
      color,
      description,
      logo_url,
      name,
      id
    };
    this.props.updateDetails(details, this.props.history);
  };

  handleInputChange = (e, type) => {
    const value = e.target.value;
    const bizDetails = { ...this.state.businessDetails };
    bizDetails[type] = value;
    this.setState({ businessDetails: bizDetails });
  };

  render() {
    return (
      <BusinessSettingsView
        businessDescription={this.state.businessDescription}
        businessDescCounter={this.state.businessDescCount}
        updateBusinessDetails={this.updateBusinessDetails}
        changeDescription={this.handleDescriptionChange}
        handleUpload={this.uploadLogo}
        progress={this.state.loading}
        logoUrl={this.state.logoUrl}
        showNotification={this.state.showNotification}
        popupTimer={this.popupTimer}
        showLoading={this.props.progress}
        businessDetails={this.state.businessDetails}
        handleInputChange={this.handleInputChange}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    uploadedFile: getUploadedFileData(state),
    businessSlug: getBusinessSlug(state),
    uploadStatus: getUploadStatus(state),
    businessId: getBusinessId(state),
    businessById: getBusinessById(state, id),
    businessColor: getBusinessColor(state),
    progress: getProgressIndicator(state)
  };
};

export const BusinessSettings = connect(
  mapStateToProps,
  { uploadLogo, updateDetails }
)(Class);
