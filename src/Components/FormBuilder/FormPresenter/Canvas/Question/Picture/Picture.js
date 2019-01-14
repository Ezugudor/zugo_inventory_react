import { FileUpload } from "../../../../../Utils/FileUpload";
import React, { Component } from "react";
import { NormalHouse } from "../Houses";
import PropTypes from "prop-types";

export class Picture extends Component {
  state = {
    dragEnter: false,
    uploadStatus: ""
  };

  highlightDropArea = e => {
    e.preventDefault();
    this.setState({ dragEnter: true });
  };

  unhighlightDropArea = e => {
    this.setState({ dragEnter: false });
  };

  handleFileDrop = e => {
    e.preventDefault();
    const dt = e.dataTransfer;
    this.uploadLogo(dt.files);
    this.setState({ dragEnter: false });
  };

  uploadLogo = files => {
    console.log(files);
    this.setState({ uploadStatus: "uploading" });
    this.props.handleClick();
  };

  render() {
    return (
      <NormalHouse el={this.props.el}>
        <FileUpload
          unhighlightDropArea={this.unhighlightDropArea}
          highlightDropArea={this.highlightDropArea}
          uploadStatus={this.state.uploadStatus}
          handleFileDrop={this.handleFileDrop}
          dragEnter={this.state.dragEnter}
          handleUpload={this.uploadLogo}
        />
      </NormalHouse>
    );
  }
}

Picture.propTypes = {
  el: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};
