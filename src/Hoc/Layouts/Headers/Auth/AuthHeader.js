import Logo from "../../../../img/logo.png";
import Style from "./AuthHeader.module.css";
import React from "react";

export const AuthHeader = props => (
  <header className={Style.Header}>
    <div className={Style.LogoBox}>
      <a href="index" className={Style.Logo}></a>
    </div>
  </header>
);
