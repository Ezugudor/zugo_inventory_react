import Style from "./Nav.module.css";
import React from "react";

export const Nav = props => (
  <nav className={Style.Nav} {...props}>
    <ul className={Style.NavList}>{props.children}</ul>
  </nav>
);
