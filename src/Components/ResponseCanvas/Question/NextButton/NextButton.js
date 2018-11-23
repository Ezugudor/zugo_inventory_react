import Style from "./NextButton.module.css";
import PropsTypes from "prop-types";
import React from "react";

const view = props => (
  <div>
    <button className={Style.nextButton} onClick={props.completeQuestion}>
      <span className={Style.nextButtonText}>OK</span>
    </button>
    <div className={Style.buttonInstruction} onClick={props.completeQuestion}>
      Press <strong>Enter</strong>
    </div>
  </div>
);

view.propTypes = {
  completeQuestion: PropsTypes.func.isRequired
};

export const NextButton = view;
