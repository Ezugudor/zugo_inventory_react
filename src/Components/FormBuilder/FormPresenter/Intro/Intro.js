import Style from "./Intro.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Intro = props => (
  <div className={Style.Intro}>
    <div className={Style.Info}>
      <h1 className="heading-primary">{props.formName}</h1>
      {/* <p className={Style.InfoText}>
        BT Account allow you to conduct transaction with pleasure, you can
        transfer unlimited amount of money to all banks in Nigeria
      </p> */}
    </div>
    <div className={Style.Instruction}>
      <span className={Style.InstructionWarning}>
        You'll need this to complete the form
      </span>
      <span className={Style.InstructionIcon}>
        <i className="far fa-hand-point-down" />
      </span>
    </div>
    <div className={Style.Requirements}>
      {props.questionIntro.children.map(child => (
        <div className={Style.Requirement} key={child.name}>
          <div className={Style.Icon}>
            <img
              className={Style.IconImage}
              src={`/img/${child.name}.svg`}
              alt={child.name}
            />
          </div>
          <div className={Style.RequirementTextWrapper}>
            <h3 className={Style.RequirementText}>{child.description}</h3>
          </div>
        </div>
      ))}
    </div>
    <div className={Style.Action}>
      <div className={Style.ActionBtnWrapper}>
        <button
          className="btn btn--primary btn--action"
          onClick={props.toggleIntro}
        >
          I'm Ready
        </button>
      </div>
      <span className={Style.ActonInstruction}>
        Press <strong>Enter</strong>
      </span>
    </div>
  </div>
);

Intro.propTypes = {
  questionIntro: PropTypes.object.isRequired,
  toggleIntro: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired
};
