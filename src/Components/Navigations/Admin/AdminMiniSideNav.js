import Style from "./AdminSideNav.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";
import { Logo } from "../../../Components/Utils";
import logoutIcon from "../../../img/logout.svg";

const getClassName = (props, page) => {
  const conditionalCalss = {};

  conditionalCalss[Style.ActiveLink] = props.pageName === page;
  conditionalCalss[Style.InactiveLink] = props.pageName !== page;
  return className(Style.NavLink, conditionalCalss);
};

export const AdminMiniSideNav = props => (
  <aside className={Style.AdminSidebar}>
    <div className={Style.AdminSidebarFixed}>
      <div className={Style.LogoBox}>
        <div className={Style.logoRound}>
          <Logo />
        </div>
      </div>
      <nav className={Style.Nav}>
        <ul className={Style.NavList}>
          <li className={Style.NavItem}>
            <a className={getClassName(props, "dashboard")} href="/dashboard">
              <i
                className={`ion ion-ios-speedometer-outline ${Style.sidebarIcon}`}
              ></i>
              Dashboard
            </a>
          </li>
          <li className={Style.NavItem}>
            <a className={getClassName(props, "formType")} href="/formtypes">
              <i
                className={`ion ion-ios-list-outline ${Style.sidebarIcon}`}
              ></i>
              <span className={Style.left_2}>Form Types</span>
            </a>
          </li>
          {/* <li className={Style.NavItem}>
            <a className={getClassName(props, "team")} href="/team">
              <i
                className={`ion ion-ios-people-outline ${Style.sidebarIcon}`}
              ></i>
              Team
            </a>
          </li>
          <li className={Style.NavItem}>
            <a className={getClassName(props, "branch")} href="/branch">
              <i
                className={`ion ion-ios-location-outline ${Style.sidebarIcon}`}
              ></i>
              Branch
            </a>
          </li>
          <li className={Style.NavItem}>
            <a className={getClassName(props, "settings")} href="/settings">
              <i
                className={`ion ion-ios-gear-outline ${Style.sidebarIcon}`}
              ></i>
              Settings
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  </aside>
);

AdminMiniSideNav.propTypes = {
  pageName: PropTypes.string.isRequired
};
