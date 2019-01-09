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
          onChange={({ target }) => props.handleUpload(target.files)}
        />
        {showUploadIndicator(props.uploadStatus)}
        <label htmlFor="logo" className={style.inputLabel}>
          Pick a file
        </label>
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
    return <p className={style.uploadInstruction}>Drag file here to upload</p>;
  return uploadStatus === "uploading" ? (
    <UploadingStatus />
  ) : (
    <UploadedStatus />
  );
};
FileUpload.propTypes = {
  unhighlightDropArea: PropTypes.func.isRequired,
  highlightDropArea: PropTypes.func.isRequired,
  handleFileDrop: PropTypes.func.isRequired,
  uploadStatus: PropTypes.string.isRequired,
  handleUpload: PropTypes.func.isRequired,
  dragEnter: PropTypes.bool.isRequired
};
