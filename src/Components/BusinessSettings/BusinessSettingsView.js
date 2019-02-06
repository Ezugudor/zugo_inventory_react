import Style from "./BusinessSettingsView.module.css";
import { FileUpload } from "../Utils/FileUpload";
import { AdminLayout } from "../../Hoc/Layouts";
import { Red } from "../Utils/Buttons";
import PropTypes from "prop-types";
import React from "react";

export const BusinessSettingsView = props => (
  <AdminLayout pageName="settings">
    <div className={Style.BusinessSettings}>
      <section className={Style.uploadSection}>
        <h3 className={Style.heading}>Upload Logo</h3>
        <FileUpload
          unhighlightDropArea={props.unhighlightDropArea}
          highlightDropArea={props.highlightDropArea}
          handleFileDrop={props.handleFileDrop}
          handleUpload={props.handleUpload}
          uploadStatus={props.uploadStatus}
          dragEnter={props.dragEnter}
        />
      </section>
      <section className={Style.textSection}>
        <h3 className={Style.heading}>Tell us about your bank</h3>
        <textarea
          onChange={props.changeDescription}
          value={props.businessDescription}
          className={Style.textArea}
        />
      </section>
      <section className={Style.textSection}>
        <Red click={props.updateBusinessDetails}>Submit Details</Red>
      </section>
    </div>
  </AdminLayout>
);

BusinessSettingsView.propTypes = {
  businessDescription: PropTypes.string.isRequired,
  updateBusinessDetails: PropTypes.func.isRequired,
  unhighlightDropArea: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  highlightDropArea: PropTypes.func.isRequired,
  handleFileDrop: PropTypes.func.isRequired,
  uploadStatus: PropTypes.string.isRequired,
  handleUpload: PropTypes.func.isRequired,
  dragEnter: PropTypes.bool.isRequired
};
