import { Aux } from "../../../Hoc/Auxiliary";
import Style from "./FullScreen.module.css";
import PropTypes from "prop-types";
import React from "react";
const View = props => (
  <Aux>
    {props.show ? (
      <div className={Style.Modal}>
        <a
          href=""
          className={Style.closeBtn}
          onClick={e => {
            e.preventDefault();
            props.togglePreview();
          }}
        >
          <i className={`${Style.closeBtnIcon} ion ion-android-cancel`}></i>
        </a>
        {props.children}
      </div>
    ) : null}
  </Aux>
);

View.propTypes = {
  show: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired
};
export const FullScreen = View;
