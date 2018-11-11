import Style from "./Blocks.module.css";
import PropTypes from "prop-types";
import { BlockTypes } from "./Types";
import { Block } from "./Block";
import React from "react";
const view = props => (
  <div className={Style.Blocks}>
    {BlockTypes.map(block => (
      <Block {...block} key={block.type} />
    ))}
  </div>
);

view.proptypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
export const Blocks = view;
