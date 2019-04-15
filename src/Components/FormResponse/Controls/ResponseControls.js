import processingIcon from "../../../img/process.svg";
import { SkyBlue, Red } from "../../Utils/Buttons";
import Style from "./ResponseControls.module.css";
import addIcon from "../../../img/add.svg";
import PropTypes from "prop-types";
import React from "react";

export const ResponseControls = props => (
  <section className={Style.controlSection}>
    <div>
      <h1 className={Style.info}>
        {props.response.form.name} - #{props.response.id}
      </h1>
    </div>
    <div className={Style.controls}>
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
  handleNewNote: PropTypes.func.isRequired
};
