import downloadIcon from "../../../img/download.svg";
import Style from "./Answer.module.css";
import { AnswerUI } from "../../Utils";
import React from "react";

export const Ansewers = props => (
  <div className={Style.answer}>
    <div className={Style.answerHeader}>
      <span> Today 12:30pm</span>
      <span className={Style.buttonIcon}>
        <img className={Style.iconImage} src={downloadIcon} alt="proccesing" />
      </span>
    </div>
    <div className={Style.answerContent}>
      <AnswerUI />
    </div>
  </div>
);
