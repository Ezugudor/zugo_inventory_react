import { StatementHouse } from "../Houses";
import { NextButton } from "../NextButton";
import PropTypes from "prop-types";
import React from "react";

export const Statement = props => (
  <StatementHouse el={props.el}>
    <NextButton completeQuestion={props.handleClick}>Continue</NextButton>
  </StatementHouse>
);

Statement.propTypes = {
  el: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};
