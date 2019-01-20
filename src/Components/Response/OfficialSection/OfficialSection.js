import style from "./OfficialSection.module.css";
import { White, SkyBlue } from "../../Utils/Buttons";
import { Modal, FileUpload } from "../../Utils";

import PropTypes from "prop-types";
import React from "react";

export const OfficialSection = props => (
  <Modal
    click={props.toggleOfficialSectionUI}
    show={props.showOfficialSectionUI}
  >
    <div className={style.officialSection}>
      <div className={style.sectionWrapper}>
        <div className={style.workerSection}>
          <h2 className={style.secondaryHeading}>For Worker</h2>
          <div className={style.inputWrapper}>
            <label htmlFor="wname" className={style.inputLabel}>
              Name
            </label>
            <input type="text" id="wname" className={style.inputs} />
          </div>
          <div className={style.fileUploaderWrapper}>
            <FileUpload />
          </div>
          <div className={style.Controls}>
            <White click={props.toggleOfficialSectionUI}>Cancel</White>
            <SkyBlue click={props.createNote}>Process</SkyBlue>
          </div>
        </div>
        <div className={style.managerSection}>
          <h2 className={style.secondaryHeading}>For Manager</h2>
          <div className={style.inputWrapper}>
            <label htmlFor="wname" className={style.inputLabel}>
              Name
            </label>
            <input type="text" id="mname" className={style.inputs} />
          </div>
          <div className={style.fileUploaderWrapper}>
            <FileUpload />
          </div>
          <div className={style.Controls}>
            <White click={props.toggleOfficialSectionUI}>Cancel</White>
            <SkyBlue click={props.createNote}>Process</SkyBlue>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

OfficialSection.propTypes = {
  toggleOfficialSectionUI: PropTypes.func.isRequired,
  showOfficialSectionUI: PropTypes.bool.isRequired
};
