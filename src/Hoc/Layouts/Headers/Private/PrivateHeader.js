import { NavItem, Nav } from "../../../../Components/Utils";
import notificationIcon from "../../../../img/notify.svg";
import { logoutUser } from "../../../../store/actions";
import { Logo } from "../../../../Components/Utils";
import logoutIcon from "../../../../img/logout.svg";
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
          <img
            src={notificationIcon}
            className={Style.Icon}
            alt="notification"
          />
        </NavItem>
        <NavItem onClick={logoutUser}>
          <img
            src={logoutIcon}
            className={`${Style.Icon} ${Style.LogoutIcon}`}
            alt="Logout"
          />
          <span>Logout</span>
        </NavItem>
      </Nav>
    </div>
  </header>
);
