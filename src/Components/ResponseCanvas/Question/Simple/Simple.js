import Style from "./Simple.module.css";
import { NormalHouse } from "../Houses";
import React from "react";

export const Simple = props => (
  <NormalHouse>
    <div className={Style.ElementAnswer}>
      <input className={Style.Answer} placeholder="Enter Your Answer Here" />
    </div>
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
