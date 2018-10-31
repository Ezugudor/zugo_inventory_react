import React from 'react';

export const AnswerUI = props => (
  <div className="answers">
    <div className="answer">
      <div className="answer__decoration-box">
        <div className="answer__decoration">
          <div className="answer__question-type">
            <span className="question__dropdown-type" />
          </div>
          <div className="answer__qustion-position">1</div>
        </div>
      </div>
      <div className="answer__content">
        <p className="answer__question">How are you?</p>
        <p className="answer__text">I am super fine</p>
      </div>
    </div>
  </div>
);
