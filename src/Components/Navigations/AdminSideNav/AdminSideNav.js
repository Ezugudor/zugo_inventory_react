import React from 'react';

export const AdminSideNav = prop => (
  <aside className="navigation-aside aside">
    <nav className="aside__nav">
      <ul className="navigation__list">
        <li className="navigation__item navigation__item--active">
          <a className="navigation__link">Dashboard</a>
        </li>
        <li className="navigation__item">
          <a className="navigation__link">Team</a>
        </li>
        <li className="navigation__item">
          <a className="navigation__link">Form Types</a>
        </li>
      </ul>
    </nav>
  </aside>
);
