import Styles from "./Footer.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Footer = props => (
  <div className={Styles.Footer}>
    <div className={Styles.FooterContent}>
      <div className={Styles.FooterProgress}>
        <p className="progress__text">
          {props.completedQuestion} of {props.totalQuestion} Qustions
        </p>
        <progress
          value={props.completedQuestion}
          max={props.totalQuestion}
          className="progress__progress"
        />
      </div>
      <div className={Styles.FooterNavigiation}>
        <button
          className="btn btn--primary btn--navigation"
          onClick={() => props.goToNextQuestion("up")}
        >
          <i className="fa fa-angle-up" />
        </button>
        <button
          className="btn btn--primary btn--navigation"
          onClick={() => props.goToNextQuestion("down")}
        >
          <i className="fa fa-angle-down" />
        </button>
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  totalQuestion: PropTypes.number.isRequired,
  goToNextQuestion: PropTypes.func.isRequired
};
