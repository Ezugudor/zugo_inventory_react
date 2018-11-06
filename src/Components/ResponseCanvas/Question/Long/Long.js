import Style from "./Long.module.css";
import { NormalHouse } from "../Houses";
import React from "react";

export const Long = props => (
  <NormalHouse>
    <div className={Style.ElementAnswer}>
      <textarea className={Style.Answer} placeholder="Enter Your Answer Here" />
    </div>
    <p className={Style.AnwerHint}>
      <strong>SHIFT</strong> + <strong>ENTER</strong> To make a new line
    </p>
    <div className={Style.NextButtonWrapper}>
      <button className={Style.NextButton} />
      <div className={Style.ButtonInstruction}>
        Press <strong>Enter</strong>
      </div>
    </div>
    <div className={Style.ValidationWrapper}>
      <div className={Style.Validation}>
        <div className={Style.ValidationText}>Please fill this</div>
      </div>
    </div>
  </NormalHouse>
);
