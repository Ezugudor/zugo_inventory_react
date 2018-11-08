import { logoutUser } from "../../../../store/actions";
import Style from "./PrivateHeader.module.css";
import Logo from "../../../../img/logo.png";
import React from "react";

export const PrivateHeader = props => (
  <header className={Style.Header}>
    <div className={Style.LogoBox}>
      <img className={Style.Logo} src={Logo} alt="Swyp Logo" />
    </div>
    <nav className={Style.Navigation}>
      <ul className={Style.NavList}>
        <li className={Style.NavItem}>
          <span className="navigation__icon" />
          <span className={Style.NavLink}>d</span>
        </li>
        <li className={Style.NavItem} onClick={logoutUser}>
          <span className="navigation__icon" />
          <span className={Style.NavLink}>Logout</span>
        </li>
      </ul>
    </nav>
  </header>
);
