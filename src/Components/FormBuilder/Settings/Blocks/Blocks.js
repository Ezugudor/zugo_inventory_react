import { blockTypes } from "../../../../utils";
import Style from "./Blocks.module.css";
import PropTypes from "prop-types";
import { Block } from "./Block";
import React from "react";

const view = props => (
  <div className={Style.Blocks}>
    {blockTypes.map(block => (
      <Block {...block} key={block.type} {...props} />
    ))}
  </div>
);

view.propTypes = {
  addElement: PropTypes.func.isRequired
};
export const Blocks = view;
