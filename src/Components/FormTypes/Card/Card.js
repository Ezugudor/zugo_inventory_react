import { slugName } from "../../../utils";
import Style from "./Card.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Card = props => (
  <div className={Style.Card} onClick={() => props.viewForms(props.formType)}>
    <div className={Style.Box}>
      <div className={Style.ImageBox}>
        <img
          className={Style.Image}
          src={`/img/${slugName(props.formType.name)}.svg`}
          alt="Card logo"
        />
      </div>
      <div className={Style.TextBox}>
        <p>{props.formType.name}</p>
      </div>
    </div>
    <div className={Style.shape}></div>
  </div>
);

Card.propTypes = {
  formType: PropTypes.object.isRequired,
  viewForms: PropTypes.func.isRequired
};
