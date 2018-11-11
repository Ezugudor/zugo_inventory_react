import Style from "./Settings.module.css";
import { Blocks } from "./Blocks";
import React from "react";

const view = props => (
  <section className={`${Style.settings} ${Style.openSection}`}>
    <div className={Style.HeadWrapper}>
      <div className={Style.Head}>
        <span className={Style.OperationName}>Blocks</span>
        <div className={Style.CloseBox}>
          <span className={Style.Close}>X</span>
        </div>
      </div>
    </div>
    <div className={Style.contentWrapper}>
      <Blocks />
    </div>
  </section>
);

export const Setting = view;
