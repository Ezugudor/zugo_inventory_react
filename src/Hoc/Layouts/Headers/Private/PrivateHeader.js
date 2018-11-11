import { NavItem, Nav } from "../../../../Components/Utils";
import { logoutUser } from "../../../../store/actions";
import { Logo } from "../../../../Components/Utils";
import Style from "./PrivateHeader.module.css";
import React from "react";

export const PrivateHeader = props => (
  <header className={Style.Header}>
    <div className={Style.LogoBox}>
      <Logo />
    </div>
    <div className={Style.NavBox}>
      <Nav>
        <NavItem>
          <span className="navigation__icon" />
          <span>d</span>
        </NavItem>
        <NavItem onClick={logoutUser}>
          <span className="navigation__icon" />
          <span>Logout</span>
        </NavItem>
      </Nav>
    </div>
  </header>
);
