import uploadedImg from "../../../../img/upload-done.svg";
import style from "./UploadedStatus.module.css";
import React from "react";

export const UploadedStatus = props => (
  <div className={style.imgWrapper}>
    <img src={uploadedImg} alt="Uploaded logo" className={style.img} />
  </div>
);
