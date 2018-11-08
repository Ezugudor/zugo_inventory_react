import Logo from "../../../../img/logo.png";
import Style from "./AuthHeader.module.css";
import React from "react";

export const AuthHeader = props => (
  <header className={Style.Header}>
    <div className={Style.LogoBox}>
      <img className={Style.Logo} src={Logo} alt="Swyp Logo" />
    </div>
  </header>
);
