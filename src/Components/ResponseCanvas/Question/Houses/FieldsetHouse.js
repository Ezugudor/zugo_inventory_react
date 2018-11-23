import Style from "./House.module.css";
import React from "react";

export const FieldSetHouse = props => (
  <div className={Style.ElementWrapper}>
    <section className="InactiveElement" data-question="true">
      <div className={Style.ActiveElementParent}>
        <div className={Style.ElementParent}>
          <div className={Style.ElementHouse}>
            <fieldset className={Style.ElementInFieldSet}>
              <div>
                <div className={Style.ElementQuestionWrapper}>
                  <div className={Style.ElementQuestionContents}>
                    <div className={Style.QuestionDecorationWrapper}>
                      <span className={Style.QuestionDecoration}>
                        <div
                          className={Style.QuestionPosition}
                          data-q-position={props.position}
                        >
                          {props.position}
                        </div>
                        <div className={Style.QuestionIcon}>
                          <span>
                            <i />
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={Style.QuestionTextWrapper}>
                  <span>
                    <legend className={Style.FieldSetLegend}>
                      I guess no one would believe how scared this make me
                    </legend>
                    <span>
                      I guess no one would believe how scared this make me
                    </span>
                    <div className={Style.RequiredQuestion}>*</div>
                  </span>
                </div>
              </div>
              <div>{props.children}</div>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  </div>
);
