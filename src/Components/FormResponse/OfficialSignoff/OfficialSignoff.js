import { getUploadedFileData, getBusinessSlug } from "../../../store/selectors";
import { uploadOfficialSigns, signOff } from "../../../store/actions";
import { getCurrentUser } from "../../../store/selectors";
import style from "./OfficialSignoff.module.css";
import { Modal, FileUpload } from "../../Utils";
import { SkyBlue } from "../../Utils/Buttons";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
export class Class extends Component {
  state = {
    loading: 0
  };

  componentDidUpdate = () => {};
  /**
   * send file to be uploaded to S3 bucket
   * @param {object} file file to be uploaded
   */
  uploadFile = file => {
    const { responseId, currentUser, bankName } = this.props;
    const formData = new FormData();

    const fileName = `${String(currentUser.name).replace(
      " ",
      ""
    )}_${responseId}_signature`;

    formData.append("asset", file);
    this.props
      .uploadOfficialSigns(formData, bankName, fileName, this)
      .then(() => {
        this.signOff();
      });
  };

  /**
   * send bank logoUrl and description data to the backend server
   */
  signOff = () => {
    if (!this.props.uploadedFile) {
      return alert("Try again when your signature is done been processed");
    }
    const { responseType, currentUser } = this.props;
    const { imageURL, shortId } = currentUser;
    const responseId = this.props.responseId;
    const details = {
      signatureUrl: this.props.uploadedFile.assetUrl,
      avatar: imageURL,
      shortId
    };

    this.props.signOff(responseId, details, responseType).then(() => {
      this.props.toggleOfficialSectionUI();
    });
  };

  render() {
    return (
      <Modal
        click={this.props.toggleOfficialSectionUI}
        show={this.props.showOfficialSectionUI}
      >
        <div className={style.officialSection}>
          <div className={style.wrapper}>
            <h2 className={style.secondaryHeading}>
              Sign off by uploading your signature
            </h2>
            <div className={style.fileUploaderWrapper}>
              <FileUpload
                handleUpload={this.uploadFile}
                progress={this.state.loading}
              />
            </div>
            <div className={style.Controls}>
              <SkyBlue click={this.props.toggleOfficialSectionUI}>
                Cancel
              </SkyBlue>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  uploadedFile: getUploadedFileData(state),
  currentUser: getCurrentUser(state),
  bankName: getBusinessSlug(state)
});

export const OfficialSignoff = connect(
  mapStateToProps,
  { uploadOfficialSigns, signOff }
)(Class);

OfficialSignoff.propTypes = {
  toggleOfficialSectionUI: PropTypes.func.isRequired,
  showOfficialSectionUI: PropTypes.bool.isRequired,
  responseType: PropTypes.string.isRequired,
  responseId: PropTypes.string.isRequired
};
