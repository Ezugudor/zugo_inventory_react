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
    dragEnter: false,
    id: `logo${this.props.mode}`
  };
  componentDidMount = () => {
    // const sel = `#${this.state.id}`;
    // alert(sel);
    let dropArea = document.querySelector(`.dropArea${this.state.id}`);
    dropArea.addEventListener("click", e => {
      dropArea.querySelector(`#${this.state.id}`).click();
    });
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
    // mode is used to know the state to update , NewImageURL or editImageURL in the controller.
    console.log("mode from inside the uploader", this.props.mode);
    this.props.handleUpload(dt.files[0], this.props.mode);
    this.setState({ dragEnter: false });
  };

  render() {
    const { dragEnter } = this.state;
    const state = dragEnter || false;
    return (
      <div htmlFor={this.state.id} className={buildDropAreaStyle(state, this)}>
        <div
          onDragLeave={this.unhighlightDropArea}
          onDragEnter={this.highlightDropArea}
          onDragOver={this.highlightDropArea}
          className={style.dropAreaContent}
          onDrop={this.handleFileDrop}
        >
          {/* assssssssssaaa {this.props.progress} */}
          <input
            type="file"
            id={this.state.id}
            className={style.logo}
            onChange={({ target }) =>
              this.props.handleUpload(target.files[0], this.props.mode)
            }
          />
          {showUploadIndicator(this.props.uploadStatus, this)}
        </div>
      </div>
    );
  }
}

const buildDropAreaStyle = (state, _this) => {
  const conditional = {};
  conditional[style.highlight] = state;
  return className(style.dropArea, conditional, `dropArea${_this.state.id}`);
};

const getPlaceholder = _this => {
  return (
    _this.props.placeholder || "Drag and drop to change logo or Click to upload"
  );
};

const showUploadIndicator = (uploadStatus, _this) => {
  if (!uploadStatus)
    return (
      <div>
        <p className={style.uploadInstruction}>{getPlaceholder(_this)}</p>
        {/* <label htmlFor="logo" className={style.inputLabel}>
          Click to upload
        </label> */}
      </div>
    );
  return uploadStatus === "uploaded" ? (
    <UploadedStatus />
  ) : (
    <UploadingStatus progress={_this.props.progress} />
  );
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
