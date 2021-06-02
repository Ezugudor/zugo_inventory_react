import Style from "./BusinessSettingsView.module.css";
import { PreviewLogo } from "./PreviewLogo";
import { FileUpload } from "../Utils/FileUpload";
import { AdminLayout } from "../../Hoc/Layouts";
import { Red } from "../Utils/Buttons";
import { Notification, Loading } from "../Utils";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const BusinessSet = props => {
  let bizDesc = props.businessDescription
    ? props.businessDescription
    : props.desc;
  let btnStyle = {
    fontSize: "20px",
    borderRadius: "20px",
    paddingLeft: "40px",
    paddingRight: "40px",
    fontWeight: "bold"
  };
  return (
    <AdminLayout pageName="settings">
      <div className={Style.BusinessSettings}>
        <section className={Style.uploadSection}>
          <div>
            <label>Business Name</label>
            <div>
              <input
                type="text"
                placeholder="Business Name"
                className={`form-control`}
                value={props.businessDetails.name}
                onChange={e => props.handleInputChange(e, "name")}
              />
            </div>
          </div>
          <div>
            <label>Business Color</label>
            <div>
              <input
                type="color"
                placeholder="Business Color"
                className={`form-control`}
                value={props.businessDetails.color}
                onChange={e => props.handleInputChange(e, "color")}
              />
            </div>
          </div>
          <label className={Style.heading}>Upload Logo</label>
          <div className={Style.dzPrevCont}>
            <div className={Style.prevCont}>
              <div className={Style.prevContInside}>
                <PreviewLogo logoUrl={props.businessDetails.logo_url} />
              </div>
            </div>
            <div className={Style.dzCont}>
              <FileUpload
                handleUpload={props.handleUpload}
                progress={props.progress}
              />
            </div>

            <div className={Style.clearfix}></div>
          </div>
          <Loading showLoading={props.showLoading} />
          <Notification
            title={"Default Title"}
            message={"Default Body Message"}
          />
        </section>
        <section className={Style.textSection}>
          <div className={Style.textAreaCont}>
            <h3 className={Style.textAreaHeading}>
              Give a brief summary of your bank
              <span className={Style.counter}>{props.businessDescCounter}</span>
            </h3>
            <textarea
              maxLength={200}
              onChange={props.changeDescription}
              value={props.businessDetails.description}
              className={Style.textArea}
              placeholder="Business Description"
              onChange={e => props.handleInputChange(e, "description")}
            />
          </div>
        </section>
        <section className={Style.footerSection}>
          <Red click={props.updateBusinessDetails} style={btnStyle}>
            Update Settings
          </Red>
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
