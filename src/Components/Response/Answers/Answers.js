import Style from "./Answers.module.css";
import { AnswerUI } from "../../Utils";
import React from "react";

export const Answers = props => (
  <section className={Style.answers}>
    <AnswerUI />
    <AnswerUI />
  </section>
);
