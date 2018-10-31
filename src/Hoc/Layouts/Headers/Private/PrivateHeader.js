import React from 'react';
export const PrivateHeader = props => (
  <header className="header">
    <div className="logo_box">
      <img className="logo" />
    </div>
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <a className="navigation__link">
            <span className="navigation__icon" />
          </a>
        </li>
        <li className="navigation__item">
          <a className="navigation__link">
            <span className="navigation__icon" />
            Logout
          </a>
        </li>
      </ul>
    </nav>
  </header>
);
