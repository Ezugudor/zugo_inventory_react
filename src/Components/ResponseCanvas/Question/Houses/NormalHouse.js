import Style from "./House.module.css";
import React from "react";

export const NormalHouse = props => (
  <div className={Style.ElementWrapper}>
    <section className="InactiveElement" data-question="true">
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
                          {props.position}
                        </div>
                        <div className={Style.QuestionIcon}>
                          <span>
                            <i />
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className={Style.QuestionTextWrapper}>
                      <label> How are you today?</label>
                      <div className={Style.RequiredQuestion}>*</div>
                    </div>
                    <p className="description" />
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
