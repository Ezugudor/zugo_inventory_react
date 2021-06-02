import IconStyle from "../../../styles/IconBackground.module.css";
import Style from "./AnswerUI.module.css";
import PropTypes from "prop-types";
import React from "react";
import { imgToFontIcon } from "../../../utils";

export const AnswerUI = props => {
  return (
    <div className={Style.answer}>
      <div className={`${Style.questionDecoration} `}>
        <div className={Style.iconHolder}>
          {imgToFontIcon(props.answer.questionType, Style.Icon)}
        </div>
        <div className={Style.questionPosition}>{props.answer.position}</div>
      </div>
      <div>
        <p className={Style.questionText}>
          {props.answer.question == "SEX" ? "GENDER" : props.answer.question} ?
        </p>
        {props.answer.questionType === "signature" ||
        props.answer.questionType === "passport" ||
        props.answer.questionType === "picture" ? (
          <div className={Style.imgWrapper}>
            <img
              src={props.answer.answer}
              alt={props.answer.questionType}
              className={Style.img}
            />
          </div>
        ) : props.answer.questionType === "video" ? (
          <video controls className={Style.video}>
            <source src={props.answer.answer} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className={Style.answerText}>{props.answer.answer}</p>
        )}
      </div>
    </div>
  );
};

AnswerUI.propTypes = {
  answer: PropTypes.object.isRequired
};
