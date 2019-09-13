import IconStyle from "../../../../../styles/IconColor.module.css";
import Style from "./Block.module.css";
import PropTypes from "prop-types";
import React from "react";
import { imgToFontIcon } from "../../../../../utils";
const view = props => (
  <div className={Style.Block} onClick={() => props.addElement(props.type)}>
    <div className={`${Style.IconBox} ${IconStyle[props.type]}`}>
      <div className={Style.IconHolder}>
        {imgToFontIcon(props.type, Style.Icon)}
      </div>
    </div>
    <span className={Style.Text}>{props.name}</span>
  </div>
);

view.propTypes = {
  addElement: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export const Block = view;
