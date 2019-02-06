import Style from "./House.module.css";
import PropTypes from "prop-types";
import React from "react";

export const NormalHouse = props => (
  <div className={Style.ElementWrapper}>
    <section
      data-question-id={props.el.id}
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
                          {props.el.position}
                        </div>
                        <div className={Style.QuestionIcon}>
                          <span>
                            <i />
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className={Style.QuestionTextWrapper}>
                      <label> {props.el.name}</label>
                      <div className={Style.RequiredQuestion}>*</div>
                    </div>
                    <p className="description">{props.el.description}</p>
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
  el: PropTypes.object.isRequired
};
