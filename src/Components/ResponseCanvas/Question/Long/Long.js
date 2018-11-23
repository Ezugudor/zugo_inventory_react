import { NextButton } from "../NextButton";
import React, { Component } from "react";
import { NormalHouse } from "../Houses";
import Style from "./Long.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";

export class Long extends Component {
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
          <textarea
            data-q-position={this.props.position}
            placeholder="Enter Your Answer Here"
            onChange={this.startInteraction}
            className={Style.Answer}
            data-input="true"
          />
        </div>
        <p className={Style.AnwerHint}>
          <strong>SHIFT</strong> + <strong>ENTER</strong> To make a new line
        </p>
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

Long.propTypes = {
  position: PropTypes.number.isRequired,
  increaseCompletedQuestion: PropTypes.func.isRequired
};
