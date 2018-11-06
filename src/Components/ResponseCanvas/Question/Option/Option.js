import Style from "./Option.module.css";
import React from "react";

export const Option = props => (
  <div className={Style.FieldSetAnswerOptions}>
    <div className={Style.FieldSetAnswerOptionWrapper}>
      <div className={Style.FieldSetOptionContents}>
        <div className={Style.FieldSetOption}>
          <div className={Style.FieldSetOptionContent}>
            <div className={Style.FieldSeOptionDecoration}>
              <div className={Style.OptionLabelBox}>
                <div className={Style.OptionLabelDecoration}>
                  <span className={Style.OptionLabelIcon}>{props.label}</span>
                </div>
              </div>
              <div className={Style.OptionTextBox}>
                <div className={Style.OptionText}>{props.text}</div>
              </div>
              <div className={Style.OptionInactivIcon}>
                <div className={Style.OptionActivIconBox}>
                  <span>
                    <i />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
