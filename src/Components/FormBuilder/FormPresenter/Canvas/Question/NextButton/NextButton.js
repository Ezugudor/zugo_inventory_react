import Style from "./NextButton.module.css";
import PropsTypes from "prop-types";
import React from "react";

export const NextButton = props => (
  <div>
    <button className={Style.nextButton} onClick={props.completeQuestion}>
      <span className={Style.nextButtonText}>
        {props.children ? props.children : "OK"}
      </span>
    </button>
    <div className={Style.buttonInstruction} onClick={props.completeQuestion}>
      Press <strong>Enter</strong>
    </div>
  </div>
);

NextButton.propTypes = {
  completeQuestion: PropsTypes.func.isRequired
};
