import signatureIcon from "../../../../img/signature.svg";
import passportIcon from "../../../../img/passport.svg";
import idCardIcon from "../../../../img/id-card.svg";
import letterIcon from "../../../../img/letter.svg";
import Style from "./Intro.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Intro = props => (
  <div className={Style.Intro}>
    <div className={Style.Info}>
      <h1 className="heading-primary">GTBank Account Opening</h1>
      <p className={Style.InfoText}>
        BT Account allow you to conduct transaction with pleasure, you can
        transfer unlimited amount of money to all banks in Nigeria
      </p>
    </div>
    <div className={Style.Instruction}>
      <span className={Style.InstructionWarning}>
        You need the following below to fill this form
      </span>
      <span className={Style.InstructionIcon}>
        <i className="far fa-hand-point-down" />
      </span>
    </div>
    <div className={Style.Requirements}>
      <div className={Style.Requirement}>
        <div className={Style.Icon}>
          <img
            className={Style.IconImage}
            src={passportIcon}
            alt="Passport Icon"
          />
        </div>
        <div className={Style.RequirementTextWrapper}>
          <h3 className={Style.RequirementText}>
            A Passport In White Background
          </h3>
        </div>
      </div>

      <div className={Style.Requirement}>
        <div className={Style.Icon}>
          <img
            className={Style.IconImage}
            src={idCardIcon}
            alt="ID Card Icon"
          />
        </div>
        <div className={Style.RequirementTextWrapper}>
          <h3 className={Style.RequirementText}>A valid ID Card</h3>
        </div>
      </div>

      <div className={Style.Requirement}>
        <div className={Style.Icon}>
          <img
            className={Style.IconImage}
            src={signatureIcon}
            alt="Signature Icon"
          />
        </div>
        <div className={Style.RequirementTextWrapper}>
          <h3 className={Style.RequirementText}>
            A digital Copy of your signature
          </h3>
        </div>
      </div>

      <div className={Style.Requirement}>
        <div className={Style.Icon}>
          <img className={Style.IconImage} src={letterIcon} alt="Letter Icon" />
        </div>
        <div className={Style.RequirementTextWrapper}>
          <h3 className={Style.RequirementText}>Reference Latter</h3>
        </div>
      </div>
    </div>
    <div className={Style.Action}>
      <div className={Style.ActionBtnWrapper}>
        <button
          className="btn btn--primary btn--action"
          onClick={props.toggleIntro}
        >
          I am Ready
        </button>
      </div>
      <span className={Style.ActonInstruction}>
        Press <strong>Enter</strong>
      </span>
    </div>
  </div>
);

Intro.propTypes = {
  toggleIntro: PropTypes.func.isRequired
};
