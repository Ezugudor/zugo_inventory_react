import Style from "./House.module.css";
import PropTypes from "prop-types";
import React from "react";

export const NormalHouse = props => (
  <div className={Style.ElementWrapper}>
    <section
      data-question-id={props.question.id}
      className="InactiveElement"
      data-question="true"
    >
      <div className={Style.ActiveElementParent}>
        <div className={Style.ElementParent}>
          <div className={Style.ElementHouse}>
            <div>
              <div>
                <div className={Style.ElementQuestionWrapper}>
                  <div className={Style.ElementQuestionContents}>
                    <div className={Style.QuestionDecorationWrapper}>
                      <span className={Style.QuestionDecoration}>
                        <div className={Style.QuestionPosition}>
                          {props.question.qPosition}
                        </div>
                        <div className={Style.QuestionIcon}>
                          <span>
                            <i />
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className={Style.QuestionTextWrapper}>
                      <label> {props.question.name}</label>
                      <div className={Style.RequiredQuestion}>*</div>
                    </div>
                    <p className="description">{props.question.description}</p>
                  </div>
                </div>
              </div>
              <div>{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

NormalHouse.propTypes = {
  question: PropTypes.object.isRequired
};
