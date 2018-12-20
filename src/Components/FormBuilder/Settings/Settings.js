import { ItemConfiguration } from "./Config";
import Style from "./Settings.module.css";
import className from "classnames";
import PropTypes from "prop-types";
import { Blocks } from "./Blocks";
import React from "react";

const buildStyle = props => {
  const conditionalStyle = {};
  conditionalStyle[Style.openSection] = props.showSettingsWindow;
  return className(Style.settings, conditionalStyle);
};
export const Setting = props =>
  props.showSettingsWindow ? (
    <section className={buildStyle(props)}>
      <div className={Style.HeadWrapper}>
        <div className={Style.Head}>
          <span className={Style.OperationName}>
            {props.settingsWindowName}
          </span>
          <div className={Style.CloseBox} onClick={props.toggleConfigWindow}>
            <span className={Style.Close}>X</span>
          </div>
        </div>
      </div>
      <div className={Style.contentWrapper}>
        {props.settingsWindowName === "build" ? (
          <Blocks {...props} />
        ) : (
          <ItemConfiguration
            handleRequirementInput={props.handleRequirementInput}
          />
        )}
      </div>
    </section>
  ) : null;

Setting.propTypes = {
  handleRequirementInput: PropTypes.func.isRequired,
  settingsWindowName: PropTypes.string.isRequired,
  showSettingsWindow: PropTypes.bool.isRequired,
  toggleConfigWindow: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired
};
