import baseStyle from "./House.module.css";
import PropTypes from "prop-types";
import React from "react";

export const StatementHouse = props => (
  <div className={baseStyle.ElementWrapper}>
    <section
      data-question-id={props.question.id}
      className="InactiveElement"
      data-question="true"
    >
      <div className={baseStyle.ActiveElementParent}>
        <div className={baseStyle.ElementParent}>
          <div className={baseStyle.ElementHouse}>
            <div>
              <div>
                <div className={baseStyle.ElementQuestionWrapper}>
                  <div className={baseStyle.ElementQuestionContents}>
                    <div className={baseStyle.QuestionDecorationWrapper}>
                      <span className={baseStyle.QuestionDecoration}>
                        <div className={baseStyle.QuestionIcon}>
                          <span>
                            <i className="fa fa-tasks" />
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className={baseStyle.QuestionTextWrapper}>
                      <span>
                        <strong>{props.question.name}</strong>
                      </span>
                      <ul>
                        {props.question.children.map((child, index) => (
                          <li key={index}>{child}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className={baseStyle.childHouse}>{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

StatementHouse.propTypes = {
  question: PropTypes.object.isRequired
};
