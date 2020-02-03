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
import React, { Component } from "react";

export class Setting extends Component {
  buildStyle = props => {
    const conditionalStyle = {};
    conditionalStyle[Style.openSection] = this.props.showSettingsWindow;
    return className(Style.settings, conditionalStyle);
  };

  render() {
    return this.props.showSettingsWindow ? (
      <section className={this.buildStyle(this.props)}>
        {/* <div className={Style.HeadWrapper}>
        <div className={Style.Head}>
          <span className={Style.OperationName}>
            {this.props.settingsWindowName}
          </span>
          <div className={Style.CloseBox} onClick={this.props.toggleConfigWindow}>
            <span className={Style.Close}>X</span>
          </div>
        </div>
      </div> */}
        <div className={`${Style.contentWrapper} overflow_scroll`}>
          {this.props.settingsWindowName === "build" ? (
            <Blocks {...this.props} />
          ) : this.props.currentElement.type === "introduction" ? (
            <IntroConfiguration
              addQuestionIntroChild={this.props.addQuestionIntroChild}
            />
          ) : this.props.currentElement.type === "address" ? (
            <AddressConfiguration
              addCompactQuestionChild={this.props.addCompactQuestionChild}
            />
          ) : this.props.currentElement.type === "branch" ? (
            <BranchConfiguration
              addCompactQuestionChild={this.props.addCompactQuestionChild}
            />
          ) : this.props.currentElement.type ? (
            <ItemConfiguration
              setQuestionProperty={this.props.setQuestionProperty}
              addValidationRule={this.props.addValidationRule}
              currentElement={this.props.currentElement}
            />
          ) : (
            <p>You have no question to configure</p>
          )}
        </div>
      </section>
    ) : null;
  }
}
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
