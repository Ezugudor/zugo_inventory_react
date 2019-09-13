import IconStyle from "../../../../../styles/IconColor.module.css";
import Style from "./EditorView.module.css";
import PropTypes from "prop-types";
import React from "react";
import { imgToFontIcon } from "../../../../../utils";

const view = props => (
  <div className={Style.editorWrapper}>
    <div data-q-type="ddd" className={Style.editor}>
      <div className={Style.iconWrapper} draggable={true}>
        <div
          className={`${Style.iconContents} ${IconStyle[props.element.type]}`}
        >
          <div className={Style.iconHolder}>
            {imgToFontIcon(props.element.type, Style.Icon)}
          </div>
          {/* <div className={Style.iconHolder}></div> */}
        </div>
      </div>
      <div className={Style.question}>
        <div className={Style.questionBox}>{props.children}</div>
      </div>
    </div>
  </div>
);

view.propTypes = {
  element: PropTypes.object.isRequired
};

export const EditorView = view;
