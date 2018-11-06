import Style from "./MultiSelect.module.css";
import { FieldSetHouse } from "../Houses";
import { Option } from "../Option";
import React from "react";

export const MultiSelect = props => (
  <FieldSetHouse {...props}>
    <div className={Style.FieldSetAnswerWrapper}>
      <div className={Style.FieldSetAnswerContents} tabIndex="-1">
        <div className={Style.Wrapper}>
          <div>
            <div className={Style.FieldSetAnswerDecoration}>
              <div className={Style.DefaultStyle} />
            </div>
            <Option label="A" text="Hello" />
            <Option label="B" text="Another" />
            <Option label="C" text="Third" />
          </div>
        </div>
      </div>
    </div>
  </FieldSetHouse>
);
