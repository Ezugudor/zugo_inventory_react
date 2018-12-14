import processingIcon from "../../../img/process.svg";
import downloadIcon from "../../../img/download.svg";
import { SkyBlue, Red } from "../../Utils/Buttons";
import Style from "./ResponseControls.module.css";
import addIcon from "../../../img/add.svg";
import PropTypes from "prop-types";
import React from "react";

export const ResponseControls = props => (
  <section className={Style.controlSection}>
    <div>
      <h1 className={Style.info}>Account Opening - #98da8da9e9dd9d</h1>
    </div>
    <div onClick={props.handleNewNote}>
      <Red styles={Style.button}>
        <span className={Style.buttonIcon}>
          <img className={Style.iconImage} src={addIcon} alt="add" />
        </span>
        Add Note
      </Red>
      <Red styles={Style.button}>
        <span className={Style.buttonIcon}>
          <img className={Style.iconImage} src={downloadIcon} alt="download" />
        </span>
        Download
      </Red>
      <SkyBlue styles={Style.button}>
        <span className={Style.buttonIcon}>
          <img
            className={Style.iconImage}
            src={processingIcon}
            alt="proccesing"
          />
        </span>
        Process
      </SkyBlue>
    </div>
  </section>
);

ResponseControls.propTypes = {
  handleNewNote: PropTypes.func.isRequired
};
