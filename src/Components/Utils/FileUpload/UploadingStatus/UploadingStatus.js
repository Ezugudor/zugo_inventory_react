import uploadingImgUrl from "../../../../img/upload-up.svg";
import style from "./UploadingStatus.module.css";
import React from "react";
export const UploadingStatus = props => (
  <div className={style.imgWrapper}>
    <img src={uploadingImgUrl} alt="uploading logo" className={style.img} />
  </div>
);
