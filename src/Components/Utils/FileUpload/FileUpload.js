import { getUploadStatus } from "../../../store/selectors";
import { UploadingStatus } from "./UploadingStatus";
import { UploadedStatus } from "./UploadedStatus";
import style from "./FileUpload.module.css";
import React, { Component } from "react";
import className from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Class extends Component {
  state = {
    dragEnter: false
  };

  highlightDropArea = e => {
    e.preventDefault();
    this.setState({ dragEnter: true });
  };

  unhighlightDropArea = e => {
    e.preventDefault();
    this.setState({ dragEnter: false });
  };

  handleFileDrop = e => {
    e.preventDefault();
    const dt = e.dataTransfer;
    this.props.handleUpload(dt.files[0]);
    this.setState({ dragEnter: false });
  };

  render() {
    const { dragEnter } = this.state;
    const state = dragEnter ? dragEnter : false;
    return (
      <div className={buildDropAreaStyle(state)}>
        <div
          onDragLeave={this.unhighlightDropArea}
          onDragEnter={this.highlightDropArea}
          onDragOver={this.highlightDropArea}
          className={style.dropAreaContent}
          onDrop={this.handleFileDrop}
        >
          <input
            type="file"
            id="logo"
            className={style.logo}
            onChange={({ target }) => this.props.handleUpload(target.files[0])}
          />
          {showUploadIndicator(this.props.uploadStatus)}
        </div>
      </div>
    );
  }
}

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

const mapStateToProps = state => ({
  uploadStatus: getUploadStatus(state)
});

export const FileUpload = connect(
  mapStateToProps,
  null
)(Class);

FileUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired
};
