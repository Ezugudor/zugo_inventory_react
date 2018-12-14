import IconStyle from "../../../styles/IconBackground.module.css";
import Style from "./AnswerUI.module.css";
import React from "react";

export const AnswerUI = props => (
  <div className={Style.answer}>
    <div className={`${Style.questionDecoration} ${IconStyle.default}`}>
      <div className={Style.iconHolder}>
        <img className={Style.Icon} src={`/img/default.svg`} alt="default" />
      </div>
      <div className={Style.questionPosition}>1</div>
    </div>
    <div>
      <p className={Style.questionText}>How are you?</p>
      <p className={Style.answerText}>I am super fine</p>
    </div>
  </div>
);
