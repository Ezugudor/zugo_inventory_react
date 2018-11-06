import { FieldSetHouse } from "../Houses";
import Style from "./YesOrNo.module.css";
import { Option } from "../Option";
import React from "react";

export const YesOrNo = props => (
  <FieldSetHouse {...props}>
    <div className={Style.FieldSetAnswerWrapper}>
      <div className={Style.FieldSetAnswerContents} tabIndex="-1">
        <div className={Style.Wrapper}>
          <div>
            <div className={Style.FieldSetAnswerDecoration}>
              <div className={Style.DefaultStyle} />
            </div>
            <Option label="Y" text="Yes" />
            <Option label="N" text="No" />
          </div>
        </div>
      </div>
    </div>
  </FieldSetHouse>
);
