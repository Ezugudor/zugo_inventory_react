import Style from "./FormBuilderSideNav.module.css";
import SettingImg from "../../../img/settings.svg";
import BlockImg from "../../../img/block.svg";
import PropTypes from "prop-types";
import React from "react";

export const FormBuilderSideNav = props => (
  <aside className={Style.Aside}>
    <div
      className={`${Style.ImgBox} ${Style.ActiveImgBox}`}
      onClick={() => props.changeSettings("build")}
    >
      <div className={Style.ImgHolder}>
        <img className={Style.Img} src={BlockImg} alt="Block" />
      </div>
    </div>
    <div
      className={Style.ImgBox}
      onClick={() => props.changeSettings("configure")}
    >
      <div className={Style.ImgHolder}>
        <img className={Style.Img} src={SettingImg} alt="Settings" />
      </div>
    </div>
  </aside>
);

FormBuilderSideNav.propTypes = {
  changeSettings: PropTypes.func.isRequired
};
