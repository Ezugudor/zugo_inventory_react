import processingIcon from "../../../img/process.svg";
import { SkyBlue, Red } from "../../Utils/Buttons";
import Style from "./ResponseControls.module.css";
import addIcon from "../../../img/add.svg";
import PropTypes from "prop-types";
import React from "react";

const showButton = props => {
  console.log("my role", props.currentUser.role);
  console.log("is approver", props.response.processors.approver.role);
  if (
    props.currentUser.role == "initiator" ||
    props.currentUser.role == "super_initiator"
  ) {
    if (!props.response.processors.approver.role) {
      return (
        <SkyBlue styles={Style.button} click={props.toggleOfficialSectionUI}>
          <span className={Style.buttonIcon}>
            <img
              className={Style.iconImage}
              src={processingIcon}
              alt="Sign Off"
            />
          </span>
          Sign Off
        </SkyBlue>
      );
    } else {
      return (
        <SkyBlue styles={Style.button}>
          <span className={Style.buttonIcon}>
            <img
              className={Style.iconImage}
              src={processingIcon}
              alt="Already Approved"
            />
          </span>
          Already Approved.
        </SkyBlue>
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
          <span className={Style.buttonIcon}>
            <img
              className={Style.iconImage}
              src={processingIcon}
              alt="Sign Off"
            />
          </span>
          Sign Off
        </SkyBlue>
      );
    } else {
      return (
        <SkyBlue styles={Style.button}>
          <span className={Style.buttonIcon}>
            <img
              className={Style.iconImage}
              src={processingIcon}
              alt="Already Signed"
            />
          </span>
          Already Approved.
        </SkyBlue>
      );
    }
  }
};

export const ResponseControls = props => (
  <section className={Style.controlSection}>
    {console.log("reponse", props)}
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
    </div>
  </section>
);
ResponseControls.propTypes = {
  toggleOfficialSectionUI: PropTypes.func.isRequired,
  handleNewNote: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired
};
