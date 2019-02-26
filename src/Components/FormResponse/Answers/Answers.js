import Style from "./Answers.module.css";
import { AnswerUI } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const Answers = props => (
  <section className={Style.answers}>
    {props.answers.map(answer => (
      <AnswerUI answer={answer} key={answer.questionId} />
    ))}
  </section>
);

Answers.propTypes = {
  answers: PropTypes.array.isRequired
};
