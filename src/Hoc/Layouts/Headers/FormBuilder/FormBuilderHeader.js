import { NavItem, Nav } from "../../../../Components/Utils";
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
          <NavItem onClick={props.togglePreview} className={Style.previewBtn}>
            <i className={`${Style.previewIcon} ion ion-android-expand`}></i>
            <span className={Style.previewName}>Preview</span>
          </NavItem>
          <NavItem onClick={props.save}>
            <img
              src={saveIcon}
              className={`${Style.Icon} ${Style.LogoutIcon}`}
              alt="save"
            />
            <span>Save</span>
          </NavItem>
          <NavItem onClick={logoutUser}>
            <img src={logoutIcon} className={Style.Icon} alt="Logout" />
            <span>Logout</span>
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
