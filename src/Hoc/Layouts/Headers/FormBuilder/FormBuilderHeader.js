import { NavItem, Nav, Toggle } from "../../../../Components/Utils";
import { logoutUser } from "../../../../store/actions";
import { Logo } from "../../../../Components/Utils";
import logoutIcon from "../../../../img/logout.svg";
import Style from "./FormBuilderHeader.module.css";
import saveIcon from "../../../../img/save.svg";
import gridIcon from "../../../../img/grid.svg";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
export const FormBuilderHeader = props => {
  const handleClick = e => {
    e.preventDefault();
    props.backToForms();
  };
  return (
    <header className={Style.Header}>
      <div className={Style.LeftSide}>
        {/* <div className={Style.LogoBox}>
        <Logo />
      </div> */}
        <div className={Style.ParentLinkBox}>
          {/* <NavLink to="" click={props.backToForms}>
          Back to form
          <img className={Style.LinkIcon} src={gridIcon} alt="Icon" />
        </NavLink> */}

          <Nav>
            <NavItem onClick={handleClick}>
              <i
                className={`${Style.backBtnIcon} ion ion-android-arrow-back`}
              ></i>
              <span className={Style.backBtnName}>Back</span>
            </NavItem>
          </Nav>
        </div>
        <div className={Style.TextBox}>
          <h3 className={Style.Text}>{props.formName}</h3>
        </div>
      </div>
      <div className={Style.RightSide}>
        <Nav>
          <div className={`${Style.toggleEditMode} ${Style.navItem}`}>
            <Toggle
              label="Live"
              trigger={props.toggleLiveStatus}
              active={props.isLive}
            />
          </div>

          <NavItem
            onClick={props.togglePreview}
            className={`${Style.navLink} ${Style.navItem}`}
          >
            <i className={`${Style.icon} ion ion-md-open`}></i>
            <span className={Style.listName}>Preview</span>
          </NavItem>

          <NavItem
            onClick={e => props.save(false)}
            className={`${Style.navLink} ${Style.navItem}`}
          >
            <i className={`${Style.icon} ion ion-ios-save`}></i>
            <span className={Style.listName}>Save</span>
          </NavItem>

          <NavItem
            onClick={e => props.save(true)}
            className={`${Style.navLink} ${Style.navItem}`}
          >
            <i className={`${Style.icon} ion ion-md-save`}></i>
            <span className={Style.listName}>{"Save & Publish"}</span>
          </NavItem>

          <NavItem
            onClick={logoutUser}
            className={`${Style.navLink} ${Style.navItem}`}
          >
            <i className={`${Style.icon} ion ion-ios-log-out`}></i>
            <span className={Style.listName}>Logout</span>
          </NavItem>
        </Nav>
      </div>
    </header>
  );
};

FormBuilderHeader.propTypes = {
  formName: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired
};
