import { NavItem, Nav } from "../../../../Components/Utils";
import notificationIcon from "../../../../img/notify.svg";
import { logoutUser } from "../../../../store/actions";
import { Logo } from "../../../../Components/Utils";
import logoutIcon from "../../../../img/logout.svg";
import Style from "./PrivateHeader.module.css";

import React from "react";
export const PrivateHeader = props => (
  <header className={Style.Header}>
    {/* <div className={Style.LogoBox}>
      <Logo />
    </div> */}

    <div className={`${Style.NavBox} ${Style.TopHeader}`}>
      <div className={`${Style.PageTitle} pull-left`}>
        {props.pageName}{" "}
        <span className={Style.PageSubtitle}>{props.pageSubtitle}</span>
      </div>
      <div className={`${Style.UserMenu} pull-right`}>
        <span className={`${Style.UserTag} bold`}>OB</span>
        <span className={Style.UserMenuName}>
          Obinna Nwamuo <span className={`mdi mdi-chevron-down`}></span> <br />
          <span className={`bold`}>Admin</span>
        </span>
        <ul className={Style.UserMenuList}>
          <li>
            <a href="admin">
              <span className={`mdi mdi-settings-outline`}></span> Settings
            </a>
          </li>
          <li>
            <a href="login" onClick={logoutUser}>
              <span className={`mdi mdi-power`}></span> Logout
            </a>
          </li>
        </ul>
      </div>

      <div className={Style.HeaderBtn}>
        <span
          className={`${Style.PrimaryBtn} tog_modal3`}
          onClick={e => {
            props.toggleGeneralReport();
          }}
        >
          <span className={`${Style.BtnIcon} mdi mdi-plus`}></span> Generate
          Report
        </span>
      </div>
    </div>
  </header>
);
