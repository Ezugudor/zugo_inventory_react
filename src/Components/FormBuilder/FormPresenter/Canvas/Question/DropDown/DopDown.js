import Style from "./DropDown.module.css";
import React from "react";
export const DropDown = props => (
  <div className={Style.AnswerWrapper}>
    <div className={Style.AnswerContents} tabIndex="-1">
      <div className={Style.AnswerBox}>
        <div className={Style.AnswerText}>
          <input className={Style.Answer} />
          <div className={Style.AnswerDecorationWrapper}>
            <div className={Style.AnswerDecoration}>
              <span>
                <i>&darr;</i>
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${Style.InactiveWrapper} ${Style.AnswerOptionsWrapper}`}
        >
          <div className={Style.OptionsBox}>
            <div className={Style.Options}>
              <div className={Style.OptionWrapper}>
                <div className={Style.OptionContents}>
                  <div className={Style.OptionBox}>
                    <div className={Style.Option}>
                      <div className={Style.OptionTextWrapper}>
                        <div className={Style.OptionBox}>
                          <div className={Style.OtionText}>Hello</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
