import Style from "./AdminSideNav.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const getClassName = (props, page) => {
  const conditionalCalss = {};
  console.log("page nasme", props.pageName);
  conditionalCalss[Style.ActiveLink] = props.pageName === page;
  conditionalCalss[Style.InactiveLink] = props.pageName !== page;
  return className(Style.NavLink, conditionalCalss);
};

export const AdminMiniSideNav = props => (
  <aside className={Style.AdminSidebar}>
    <nav className={Style.Nav}>
      <ul className={Style.NavList}>
        <li className={Style.NavItem}>
          <a className={getClassName(props, "dashboard")} href="/dashboard">
            Dashboard
          </a>
        </li>
        <li className={Style.NavItem}>
          <a className={getClassName(props, "formType")} href="/formtypes">
            Form Types
          </a>
        </li>
        {/* <li className={Style.NavItem}>
          <a className={getClassName(props, "team")} href="/team">
            Team
          </a>
        </li>
        <li className={Style.NavItem}>
          <a className={getClassName(props, "branch")} href="/branch">
            Branch
          </a>
        </li>
        <li className={Style.NavItem}>
          <a className={getClassName(props, "settings")} href="/settings">
            Settings
          </a>
        </li> */}
      </ul>
    </nav>
  </aside>
);

AdminMiniSideNav.propTypes = {
  pageName: PropTypes.string.isRequired
};
