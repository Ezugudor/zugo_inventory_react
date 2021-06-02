import processingIcon from "../../../img/process.svg";
import { SkyBlue, Red } from "../../Utils/Buttons";
import Style from "./ResponseControls.module.css";
import addIcon from "../../../img/add.svg";
import PropTypes from "prop-types";
import React from "react";

const showButton = props => {
  if (
    props.currentUser.role == "initiator" ||
    props.currentUser.role == "super_initiator"
  ) {
    if (!props.response.processors.approver.role) {
      return (
        <SkyBlue styles={Style.button} click={props.toggleOfficialSectionUI}>
          <i className={`ion ion-android-time ${Style.iconImage}`}></i>
          Sign Off
        </SkyBlue>
      );
    } else {
      return (
        <span className={Style.approved}>
          <i
            className={`ion ion-ios-checkmark-outline ${Style.approvedIcon}`}
          ></i>
          Already Approved.
        </span>
      );
    }
  }
  if (
    props.currentUser.role == "approver" ||
    props.currentUser.role == "super_approver"
  ) {
    if (!props.response.processors.approver.role) {
      return (
        <SkyBlue styles={Style.button} click={props.toggleOfficialSectionUI}>
          <i className={`ion ion-android-time ${Style.iconImage}`}></i>
          Sign Off
        </SkyBlue>
      );
    } else {
      return (
        <span className={Style.approved}>
          <i
            className={`ion ion-ios-checkmark-outline ${Style.approvedIcon}`}
          ></i>
          Already Approved.
        </span>
      );
    }
  }
};

export const ResponseControls = props => (
  <section className={Style.controlSection}>
    {/* {console.log("reponse", props)}
    <div>
      <h1 className={Style.info}>
        {props.response.form.name} - #{props.response.id}
      </h1>
    </div>
    <div className={Style.controls}>
      {showButton(props)}
      <Red styles={Style.button} click={props.handleNewNote}>
        <span className={Style.buttonIcon}>
          <img className={Style.iconImage} src={addIcon} alt="add" />
        </span>
        Add Note
      </Red>
    </div> */}

    <div className={Style.ControlBox}>
      <i className={`${Style.titleIcon} ion ion-ios-paper-outline`}></i>
      <div className={Style.info}>
        <span className={Style.Text}>Showing :</span>
        <span className={`${Style.Text} ${Style.parent}`}>
          {props.response.form.name}
        </span>

        <i className={`${Style.arrow} ion ion-android-remove`}></i>

        <span className={`${Style.Text} ${Style.name}`}>
          {props.response.shortId}
        </span>
      </div>
      {/* <span className={Style.Text}>Forms </span> */}

      <div className={Style.newBtn}>
        <Red click={props.handleNewNote}>
          <i className={`${Style.newBtnIcon} ion ion-ios-plus`}></i>
          <span className={Style.newBtnText}>Add Note</span>
        </Red>
      </div>
      <div className={Style.signBtnCont}>{showButton(props)}</div>
      <div className={Style.clearfix}></div>
    </div>
  </section>
);
ResponseControls.propTypes = {
  toggleOfficialSectionUI: PropTypes.func.isRequired,
  handleNewNote: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired
};
