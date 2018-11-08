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
          <a className={Style.NavLink} href="#">
            <span className="navigation__icon" />d
          </a>
        </li>
        <li className={Style.NavItem}>
          <a className={Style.NavLink}>
            <span className="navigation__icon" />
            Logout
          </a>
        </li>
      </ul>
    </nav>
  </header>
);
