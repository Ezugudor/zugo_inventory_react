import { BusinessSettingsView } from "../../Components/BusinessSettings";
import React, { Component } from "react";

class Class extends Component {
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
  };

  render() {
    return (
      <BusinessSettingsView
        unhighlightDropArea={this.unhighlightDropArea}
        highlightDropArea={this.highlightDropArea}
        uploadStatus={this.state.uploadStatus}
        handleFileDrop={this.handleFileDrop}
        dragEnter={this.state.dragEnter}
        handleUpload={this.uploadLogo}
      />
    );
  }
}

export const BusinessSettings = Class;
