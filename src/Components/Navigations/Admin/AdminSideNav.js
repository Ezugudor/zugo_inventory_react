import Style from "./AdminSideNav.module.css";
import React from "react";

export const AdminSideNav = prop => (
  <aside className={Style.AdminSidebar}>
    <nav className={Style.Nav}>
      <ul className={Style.NavList}>
        <li className={Style.NavItem}>
          <a
            className={`${Style.NavLink} ${Style.InactiveLink}`}
            href="/dashboard"
          >
            Dashboard
          </a>
        </li>
        <li className={Style.NavItem}>
          <a className={`${Style.NavLink} ${Style.InactiveLink}`} href="/team">
            Team
          </a>
        </li>
        <li className={Style.NavItem}>
          <a
            className={`${Style.NavLink} ${Style.ActiveLink}`}
            href="/formtypes"
          >
            Form Types
          </a>
        </li>
      </ul>
    </nav>
  </aside>
);
