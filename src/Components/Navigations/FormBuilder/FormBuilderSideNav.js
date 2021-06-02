import Style from "./FormBuilderSideNav.module.css";
import SettingImg from "../../../img/settings.svg";
import BlockImg from "../../../img/block.svg";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const buildStyle = (props, tab) => {
  const conditionalStyle = {};
  conditionalStyle[Style.ActiveImgBox] = props.settingsWindowName === tab;
  return className(Style.ImgBox, conditionalStyle);
};

export const FormBuilderSideNav = props => (
  <aside className={Style.Aside}>
    <div
      className={buildStyle(props, "build")}
      onClick={() => props.changeConfigWindow("build")}
    >
      <div className={Style.ImgHolder}>
        <img className={Style.Img} src={BlockImg} alt="Block" />
      </div>
    </div>
    <div
      className={buildStyle(props, "configuration")}
      onClick={() => props.changeConfigWindow("configuration")}
    >
      <div className={Style.ImgHolder}>
        <img className={Style.Img} src={SettingImg} alt="Settings" />
      </div>
    </div>
  </aside>
);

FormBuilderSideNav.propTypes = {
  settingsWindowName: PropTypes.string.isRequired,
  changeConfigWindow: PropTypes.func.isRequired
};
