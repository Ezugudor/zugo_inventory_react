import Style from "./Card.module.css";
import React from "react";
import img from "../../../img/registration.svg";

export const Card = props => (
  <div className={Style.Card}>
    <div className={Style.Box}>
      <div className={Style.ImageBox}>
        <img className={Style.Image} src={img} alt="Card logo" />
      </div>
      <div className={Style.TextBox}>
        <p>Registration</p>
      </div>
    </div>
  </div>
);
