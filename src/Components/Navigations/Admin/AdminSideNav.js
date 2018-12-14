import Style from "./AdminSideNav.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React from "react";

const getClassName = (props, page) => {
  const conditionalCalss = {};
  conditionalCalss[Style.ActiveLink] = props.pageName === page;
  conditionalCalss[Style.InactiveLink] = props.pageName !== page;
  return className(Style.NavLink, conditionalCalss);
};

export const AdminSideNav = props => (
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
        <li className={Style.NavItem}>
          <a className={getClassName(props, "team")} href="/team">
            Team
          </a>
        </li>
      </ul>
    </nav>
  </aside>
);

AdminSideNav.propTypes = {
  pageName: PropTypes.string.isRequired
};
