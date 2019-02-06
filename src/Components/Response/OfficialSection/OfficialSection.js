import { White, SkyBlue } from "../../Utils/Buttons";
import style from "./OfficialSection.module.css";
import { Modal, FileUpload } from "../../Utils";
import React, { Component } from "react";
import PropTypes from "prop-types";

export class OfficialSection extends Component {
  state = {
    businessDescription: ""
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
  handleUpload = file => {
    const formData = new FormData();
    const fileName = `${this.props.businessSlug}logo`;
    formData.append("logo", file);
    this.props.updateUploadStatus("uploading");
    this.props.uploadFile("logo", formData, fileName);
  };

  /**
   * send bank logoUrl and description data to the backend server
   */
  signOff = () => {
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
      <Modal
        click={this.props.toggleOfficialSectionUI}
        show={this.props.showOfficialSectionUI}
      >
        <div className={style.officialSection}>
          <div className={style.wrapper}>
            <h2 className={style.secondaryHeading}>
              Sign off by uploading your signature
            </h2>
            <div className={style.inputWrapper}>
              <div>
                <label htmlFor="fName" className={style.inputLabel}>
                  First Name
                </label>
                <input type="text" id="fName" className={style.inputs} />
              </div>

              <div>
                <label htmlFor="lName" className={style.inputLabel}>
                  Last Name
                </label>
                <input type="text" id="lName" className={style.inputs} />
              </div>
            </div>
            <div className={style.fileUploaderWrapper}>
              <FileUpload handleUpload={this.handleUpload} />
            </div>
            <div className={style.Controls}>
              <White click={this.props.toggleOfficialSectionUI}>Cancel</White>
              <SkyBlue click={this.signOff}>Sign Off</SkyBlue>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

OfficialSection.propTypes = {
  toggleOfficialSectionUI: PropTypes.func.isRequired,
  showOfficialSectionUI: PropTypes.bool.isRequired
};
