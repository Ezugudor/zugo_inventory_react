import { blockTypes } from "../../../../utils";
import Style from "./Blocks.module.css";
import PropTypes from "prop-types";
import { Block } from "./Block";
import React from "react";

const view = props => (
  <div className={Style.Blocks}>
    {blockTypes.map((block, index) => (
      <Block {...block} key={index} addElement={props.addElement} />
    ))}
  </div>
);

view.propTypes = {
  addElement: PropTypes.func.isRequired
};
export const Blocks = view;
