import Styles from "./Footer.module.css";
import React from "react";

export const Footer = props => (
  <div className={Styles.Footer}>
    <div className={Styles.FooterContent}>
      <div className={Styles.FooterProgress}>
        <p className="progress__text">2 of 10 Answered</p>
        <progress value=".2" className="progress__progress" />
      </div>
      <div className={Styles.FooterNavigiation}>
        <button className="btn btn--primary btn--navigation">
          <i className="fa fa-angle-up" />
        </button>
        <button className="btn btn--primary btn--navigation">
          <i className="fa fa-angle-down" />
        </button>
      </div>
    </div>
  </div>
);
