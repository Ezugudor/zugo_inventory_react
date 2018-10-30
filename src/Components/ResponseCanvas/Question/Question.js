import {InputManager } from "../../../core";
import React from "react";

export const Question = props => (
  <section className="question">
    <div className="question-wrapper">
      <div className="question-inner">
        <div className="question-box">
          <div className="question__content">
            <div className="question__decoration">
              <span className="decoration">
                <div className="question__position">1</div>
                <div className="question__icon">
                  <i className="fa fa-arrow-right"></i>
                </div>
              </span>
            </div>
            <div className="question__text">
              <label className="question__lable" htmlFor="ddd"></label>
            </div>
          </div>
        </div>
        <div className="error-msg"></div>
        {InputManager.constructInput(props.input)}
      </div>
    </div>
  </section>
)