import Style from "./Card.module.css";
import React from "react";
export const Card = props => (
  <div className={Style.Card}>
    <div className={Style.Body}>
      <div className={Style.Text}>Account Opening</div>
    </div>
    <div className={Style.Footer}>
      <span className={Style.FooterText}>100 Response</span>
    </div>
  </div>
);
