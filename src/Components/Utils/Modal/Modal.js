import { Aux } from "../../../Hoc/Auxiliary";
import Style from "./Modal.module.css";
import { BackDrop } from "../Backdrop";
import PropTypes from "prop-types";
import React from "react";
const View = props => (
  <Aux>
    <BackDrop show={props.show} click={props.click} />
    <div
      className={Style.Modal}
      style={{
        visibility: props.show ? "visible" : "hidden",
        opacity: props.show ? 1 : 0
      }}
    >
      {props.children}
    </div>
  </Aux>
);

View.propTypes = {
  show: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired
};
export const Modal = View;
