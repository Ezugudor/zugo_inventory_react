import LogoImg from "../../../img/logo.png";
import Style from "./Logo.module.css";
import React from "react";

export const Logo = props => (
  <img className={Style.Logo} src={LogoImg} alt="Swyp Logo" />
);
