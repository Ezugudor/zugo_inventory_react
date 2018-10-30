import styles from   "./intro.css";
import React from "react";

console.log(styles);
export const Intro = props => (
  <section className="IntroSection">
    <div className="Intro">
      <div className="info">
        <h1 className="heading-primary">Account Opening</h1>
        <p className="info__text">Account type descriptiion</p>
      </div>
      <div className="instruction">
        <span className="instruction__warning">You need the following below to fill this form</span>
        <span className="instruction__icon">
          <i className="fa fa-point-down"></i>
        </span>
      </div>
      <div className="icons">
        <div className="icon__wrapper">
          <img className="icon"></img>
        </div>
        <div className="icon__wrapper">
          <img className="icon"></img>
        </div>
        <div className="icon__wrapper">
          <img className="icon"></img>
        </div>
        <div className="icon__wrapper">
          <img className="icon"></img>
        </div>
      </div>
      <div className="action">
        <button className="btn btn-primary action__btn">I am Ready</button>
        <span className="action__instruction">Press <strong>Enter</strong></span>
      </div>
    </div>
  </section>
)