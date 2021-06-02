import { NavItem, Nav } from "../../../../Components/Utils";
import notificationIcon from "../../../../img/notify.svg";
import { logoutUser } from "../../../../store/actions";
import { Logo } from "../../../../Components/Utils";
import logoutIcon from "../../../../img/logout.svg";
import Style from "./PrivateHeader.module.css";
import { getCurrentUser } from "../../../../store/selectors";

import React, { Component } from "react";
import { connect } from "react-redux";
class Class extends Component {
  constructor(props) {
    super();
  }
  getInitials(a, b) {
    return `${a.charAt(0)} ${b.charAt(0)}`;
  }
  render() {
    return (
      <header className={Style.Header}>
        {/* <div className={Style.LogoBox}>
      <Logo />
    </div> */}
        {console.log("this", this.props.currentUser)}
        <div className={`${Style.NavBox} ${Style.TopHeader}`}>
          <div className={`${Style.PageTitle} pull-left`}>
            {this.props.pageName}{" "}
            <span className={Style.PageSubtitle}>
              {this.props.pageSubtitle}
            </span>
          </div>
          <div className={`${Style.UserMenu} pull-right`}>
            <span className={`${Style.UserTag} bold`}>
              {this.getInitials(
                this.props.currentUser.surname,
                this.props.currentUser.firstname
              )}
            </span>
            <span className={Style.UserMenuName}>
              {`${this.props.currentUser.surname} ${this.props.currentUser.firstname}`}{" "}
              <span className={`mdi mdi-chevron-down`}></span> <br />
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
                this.props.toggleGeneralReport();
              }}
            >
              <span className={`${Style.BtnIcon} mdi mdi-plus`}></span> Generate
              Report
            </span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});
export const PrivateHeader = connect(
  mapStateToProps,
  null
)(Class);
