import img from "../../../img/registration.svg";
import Style from "./Card.module.css";
import { slugName } from "../../../utils";
import React from "react";

export const Card = props => (
  <div className={Style.Card}>
    <div className={Style.Box}>
      <div className={Style.ImageBox}>
        <img
          className={Style.Image}
          src={`../../../img/${slugName(props.formtype.name)}.svg`}
          alt="Card logo"
        />
      </div>
      <div className={Style.TextBox}>
        <p>{props.formtype.name}</p>
      </div>
    </div>
  </div>
);
