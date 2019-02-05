import { UploadingStatus } from "./UploadingStatus";
import { UploadedStatus } from "./UploadedStatus";
import style from "./FileUpload.module.css";
import className from "classnames";
import PropTypes from "prop-types";

import React from "react";
export const FileUpload = props => {
  const { dragEnter } = props;
  const state = dragEnter ? dragEnter : false;
  return (
    <div className={buildDropAreaStyle(state)}>
      <div
        className={style.dropAreaContent}
        onDragLeave={props.unhighlightDropArea}
        onDragEnter={props.highlightDropArea}
        onDragOver={props.highlightDropArea}
        onDrop={props.handleFileDrop}
      >
        <input
          type="file"
          id="logo"
          className={style.logo}
          onChange={({ target }) => props.handleUpload(target.files[0])}
        />
        {showUploadIndicator(props.uploadStatus)}
      </div>
    </div>
  );
};

const buildDropAreaStyle = state => {
  const conditional = {};
  conditional[style.highlight] = state;
  return className(style.dropArea, conditional);
};

const showUploadIndicator = uploadStatus => {
  if (!uploadStatus)
    return (
      <div>
        <p className={style.uploadInstruction}>Drag file here to upload</p>
        <label htmlFor="logo" className={style.inputLabel}>
          Or pick a file
        </label>
      </div>
    );
  return uploadStatus === "uploaded" ? <UploadedStatus /> : <UploadingStatus />;
};
FileUpload.propTypes = {
  unhighlightDropArea: PropTypes.func.isRequired,
  highlightDropArea: PropTypes.func.isRequired,
  handleFileDrop: PropTypes.func.isRequired,
  uploadStatus: PropTypes.string.isRequired,
  handleUpload: PropTypes.func.isRequired,
  dragEnter: PropTypes.bool.isRequired
};
