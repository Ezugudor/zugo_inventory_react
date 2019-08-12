import Style from "./BusinessSettingsView.module.css";
import { PreviewLogo } from "./PreviewLogo";
import { FileUpload } from "../Utils/FileUpload";
import { AdminLayout } from "../../Hoc/Layouts";
import { Red } from "../Utils/Buttons";
import { Notification } from "../Utils/Notification";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const BusinessSet = props => {
  let bizDesc = props.businessDescription
    ? props.businessDescription
    : props.desc;
  return (
    <AdminLayout pageName="settings">
      <div className={Style.BusinessSettings}>
        <section className={Style.uploadSection}>
          <h3 className={Style.heading}>Upload Logo</h3>
          <div>
            <div className={Style.dzCont}>
              <FileUpload
                handleUpload={props.handleUpload}
                progress={props.progress}
              />
            </div>
            <div className={Style.prevCont}>
              <div className={Style.prevContInside}>
                <PreviewLogo logoUrl={props.logoUrl} />
              </div>
            </div>
            <div className={Style.clearfix}></div>
          </div>
          <Notification />
        </section>
        <section className={Style.textSection}>
          <h3 className={Style.heading}>Give a brief summary of your bank</h3>
          <textarea
            maxLength={200}
            onChange={props.changeDescription}
            value={bizDesc}
            className={Style.textArea}
          />
        </section>
        <section className={Style.textSection}>
          <Red click={props.updateBusinessDetails}>Submit</Red>
        </section>
      </div>
    </AdminLayout>
  );
};

BusinessSet.propTypes = {
  businessDescription: PropTypes.string.isRequired,
  updateBusinessDetails: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    desc: state.business.description
  };
};

export const BusinessSettingsView = connect(mapStateToProps)(BusinessSet);
