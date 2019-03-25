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
    this.props.uploadOfficialSigns(formData, bankName, fileName).then(() => {
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
    const responseId = this.props.responseId;
    const details = {
      signatureUrl: this.props.uploadedFile.imageUrl
    };
    this.props.signOff(responseId, details).then(() => {
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
              <FileUpload handleUpload={this.uploadFile} />
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
  responseId: PropTypes.string.isRequired
};
