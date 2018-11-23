import { NextButton } from "../NextButton";
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

  completeQuestion = () => {
    this.props.increaseCompletedQuestion();
  };

  render() {
    return (
      <NormalHouse {...this.props}>
        <div className={Style.ElementAnswer}>
          <input
            data-q-position={this.props.position}
            placeholder="Enter Your Answer Here"
            onChange={this.startInteraction}
            className={Style.Answer}
            data-input="true"
          />
        </div>
        <div className={this.wrapperClass()}>
          <NextButton completeQuestion={this.completeQuestion} />
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
  position: PropTypes.number.isRequired,
  increaseCompletedQuestion: PropTypes.func.isRequired
};
