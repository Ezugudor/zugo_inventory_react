import { NextButton } from "../NextButton";
import { InputManager } from "../../../../../../core";
import React, { Component } from "react";
import Style from "./Simple.module.css";
import { NormalHouse } from "../Houses";
import classNames from "classnames";
import PropTypes from "prop-types";

export class Simple extends Component {
  state = {
    notInteracting: true
  };

  wrapperClass = () => {
    const conditionalClasses = {};
    conditionalClasses[Style.inactiveWrapper] = this.state.notInteracting;
    return classNames(Style.nextButtonWrapper, conditionalClasses);
  };

  startInteraction = e => {
    const value = e.target.value;
    if (value) {
      this.setState({ notInteracting: false });
    } else {
      this.setState({ notInteracting: true });
    }
  };

  render() {
    return (
      <NormalHouse question={this.props.question}>
        <div className={Style.ElementAnswer}>
          <input
            placeholder={InputManager.generatePlaceholder(this.props.question)}
            type={InputManager.generateType(this.props.question)}
            data-q-position={this.props.question.qPosition}
            onChange={this.startInteraction}
            className={Style.Answer}
            data-input="true"
          />
        </div>
        <div className={this.wrapperClass()}>
          <NextButton completeQuestion={this.props.handleClick} />
        </div>
        <div className={Style.ValidationWrapper}>
          <div className={Style.Validation}>
            <div className={Style.ValidationText}>Please fill this</div>
          </div>
        </div>
      </NormalHouse>
    );
  }
}

Simple.propTypes = {
  question: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};
