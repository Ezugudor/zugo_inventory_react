import IconStyle from "../../../styles/IconBackground.module.css";
import Style from "./AnswerUI.module.css";
import PropTypes from "prop-types";
import React from "react";

export const AnswerUI = props => (
  <div className={Style.answer}>
    <div
      className={`${Style.questionDecoration} ${
        IconStyle[props.answer.questionType]
      }`}
    >
      <div className={Style.iconHolder}>
        <img
          className={Style.Icon}
          src={`/img/${props.answer.questionType}.svg`}
          alt={props.type}
        />
      </div>
      <div className={Style.questionPosition}>{props.answer.position}</div>
    </div>
    <div>
      <p className={Style.questionText}>{props.answer.question}?</p>
      {props.answer.questionType === "signature" ||
      props.answer.questionType === "passport" ? (
        <div className={Style.imgWrapper}>
          <img
            src={props.answer.answer}
            alt={props.answer.questionType}
            className={Style.img}
          />
        </div>
      ) : (
        <p className={Style.answerText}>{props.answer.answer}</p>
      )}
    </div>
  </div>
);

AnswerUI.propTypes = {
  answer: PropTypes.object.isRequired
};
