import Style from "./Info.module.css";
import React from "react";

export const Info = props => (
  <section className="section__info">
    <div className={Style.info}>
      <span>
        <input className={Style.input} type="checkbox" />
      </span>
      <span> 2 Responses in total</span>
    </div>
  </section>
);
