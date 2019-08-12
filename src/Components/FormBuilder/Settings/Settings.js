import {
  ItemConfiguration,
  IntroConfiguration,
  BranchConfiguration,
  AddressConfiguration
} from "./Config";
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
        ) : props.currentElement.type === "introduction" ? (
          <IntroConfiguration
            addQuestionIntroChild={props.addQuestionIntroChild}
          />
        ) : props.currentElement.type === "address" ? (
          <AddressConfiguration
            addCompactQuestionChild={props.addCompactQuestionChild}
          />
        ) : props.currentElement.type === "branch" ? (
          <BranchConfiguration
            addCompactQuestionChild={props.addCompactQuestionChild}
          />
        ) : props.currentElement.type ? (
          <ItemConfiguration
            setQuestionProperty={props.setQuestionProperty}
            addValidationRule={props.addValidationRule}
            currentElement={props.currentElement}
          />
        ) : (
          <p>You have no question to configure</p>
        )}
      </div>
    </section>
  ) : null;

Setting.propTypes = {
  addQuestionIntroChild: PropTypes.func.isRequired,
  addCompactQuestionChild: PropTypes.func.isRequired,
  settingsWindowName: PropTypes.string.isRequired,
  setQuestionProperty: PropTypes.func.isRequired,
  showSettingsWindow: PropTypes.bool.isRequired,
  toggleConfigWindow: PropTypes.func.isRequired,
  addValidationRule: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired,
  addElement: PropTypes.func.isRequired
};
