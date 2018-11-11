import { logoutUser } from "../../../../store/actions";
import { Logo } from "../../../../Components/Utils";
import { NavItem, Nav } from "../../../../Components/Utils";
import Style from "./FormBuilderHeader.module.css";
import BlockIcon from "../../../../img/block.svg";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const view = props => (
  <header className={Style.Header}>
    <div className={Style.LeftSide}>
      <div className={Style.LogoBox}>
        <Logo />
      </div>
      <div className={Style.ParentLinkBox}>
        <NavLink to="/formtypes">
          <img className={Style.LinkIcon} src={BlockIcon} alt="Icon" />
        </NavLink>
      </div>
      <div className={Style.TextBox}>
        <span className={Style.TextIcon}>
          <i />
        </span>
        <h3 className={Style.Text}>Account Opening</h3>
      </div>
    </div>
    <div className={Style.RightSide}>
      <Nav>
        <NavItem>
          <span className="navigation__icon" />
          <span>Save</span>
        </NavItem>
        <NavItem>
          <span className="navigation__icon" />
          <span>Preview</span>
        </NavItem>
        <NavItem>
          <span className="navigation__icon" />
          <span>d</span>
        </NavItem>
        <NavItem>
          <span className="navigation__icon" />
          <span>Logout</span>
        </NavItem>
      </Nav>
    </div>
  </header>
);

// view.propTypes = {
//   linkToParent: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired
// };

export const FormBuilder = view;
