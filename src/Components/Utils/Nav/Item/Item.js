import Style from "./Item.module.css";
import React from "react";

export const NavItem = props => (
  <li className={Style.Item} {...props}>
    {props.children}
  </li>
);
