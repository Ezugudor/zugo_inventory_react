import uploadingImgUrl from "../../../../img/upload-up.svg";
import style from "./UploadingStatus.module.css";
import React, { Component } from "react";
export class UploadingStatus extends Component {
  constructor(props) {
    super(props);
    this.progress = React.createRef();
  }

  // console.log("uploading component", node);
  componentDidUpdate = () => {
    this.progress.current.style.width = `${this.props.progress}%`;
  };
  render() {
    return (
      <div className={style.pbCont}>
        <div ref={this.progress} className={style.pbInside}>
          {/* {this.props.progress} */}
        </div>
        <span className={style.placeholder}>
          {this.props.progress >= 100 ? "Finalizing..." : "Uploading..."}
        </span>
      </div>
    );
  }
}
