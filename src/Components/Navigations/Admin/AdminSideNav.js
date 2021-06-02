import Style from "./AdminSideNav.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import React, { Component } from "react";
import { Logo } from "../../../Components/Utils";
import logoutIcon from "../../../img/logout.svg";
import $ from "jquery";
window.jQuery = $;
require("../../../plugins/nicescrollbar/nicescroll.js");

export class AdminSideNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.setupCanvas();

    $(".overflow_scroll").niceScroll({
      cursorcolor: "var(--color3)",
      cursorwidth: "15px",
      autohidemode: true,
      touchbehavior: false,
      grabcursorenabled: false,
      spacebarenabled: false
    });
  }

  getClassName = (props, page) => {
    const conditionalCalss = {};

    conditionalCalss[Style.ActiveLink] = props.pageName === page;
    conditionalCalss[Style.InactiveLink] = props.pageName !== page;
    return className(Style.NavLink, conditionalCalss);
  };
  render() {
    return (
      <aside className={Style.AdminSidebarRelative}>
        <aside className={Style.AdminSidebar}>
          <div className={Style.LogoBox}>
            <div className={Style.logoCont}>
              <Logo logoUrl="/images/logo/logo.png" />
            </div>
          </div>
          <nav className={`${Style.Nav} ${Style.SideMenu} overflow_scroll`}>
            <ul className={`${Style.NavList} ${Style.MenuList}`}>
              <li className={Style.NavItem}>
                <a
                  className={this.getClassName(this.props, "dashboard")}
                  href="/dashboard"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/home.webp"
                  />
                  Dashboard
                </a>
              </li>
              <li className={Style.NavItem}>
                <a
                  className={this.getClassName(this.props, "inventory")}
                  href="/stocks"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/invent.webp"
                  />{" "}
                  Stocks
                </a>
              </li>
              <li className={Style.NavItem}>
                <a
                  className={this.getClassName(this.props, "supply")}
                  href="/receivingsum"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/supply.webp"
                  />{" "}
                  Receivings
                </a>
              </li>
              {/* <li className={Style.NavItem}>
                <a
                  className={this.getClassName(this.props, "sales")}
                  href="/supplysum"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/store.webp"
                  />
                  Supply
                </a>
              </li> */}
              <li className={Style.NavItem}>
                <a
                  className={this.getClassName(this.props, "credit")}
                  href="/creditsum"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/credit.webp"
                  />
                  Credit book
                </a>
              </li>
              <li className={Style.NavItem}>
                <a
                  className={this.getClassName(this.props, "payment")}
                  href="/payment"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/payment.webp"
                  />
                  Payment history
                </a>
              </li>
              <li className={`${Style.NavItem} ${Style.Dropdown}`}>
                <label
                  for="toggleUser"
                  className={this.getClassName(
                    this.props,
                    "users",
                    Style.toggleUser
                  )}
                  href="#"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/users.webp"
                  />
                  Users
                  <span className={`pull-right mdi mdi-chevron-down`}></span>
                </label>
                <input
                  id="toggleUser"
                  type="checkbox"
                  className={Style.UserDropdownCheck}
                />
                <ul className={Style.SubMenu}>
                  <li>
                    <a href="admin" class="">
                      Admin
                    </a>
                  </li>
                  <li>
                    <a href="outlet_manager" class="">
                      Outlet Managers
                    </a>
                  </li>
                  <li>
                    <a href="customers" class="">
                      Customers
                    </a>
                  </li>
                  <li className={Style.NavItem}>
                    <a
                      className={this.getClassName(this.props, "drivers")}
                      href="/drivers"
                    >
                      Drivers
                    </a>
                  </li>
                </ul>
              </li>
              <li className={Style.NavItem}>
                <a
                  className={this.getClassName(this.props, "outlets")}
                  href="/outlets"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/shops.webp"
                  />
                  Outlets
                </a>
              </li>

              {/* <li className={Style.NavItem}>
                <a
                  className={this.getClassName(this.props, "companies")}
                  href="/companies"
                >
                  <img
                    className={Style.sidebarIcon}
                    src="/images/icons/companies.webp"
                  />
                  Companies
                </a>
              </li> */}
              {/* <li className={Style.NavItem}>
            <a className={getClassName(props, "settings")} href="/settings">
              <i
                className={`ion ion-ios-gear-outline ${Style.sidebarIcon}`}
              ></i>
              Settings
            </a>
          </li> */}
            </ul>
          </nav>
        </aside>
      </aside>
    );
  }
}

AdminSideNav.propTypes = {
  pageName: PropTypes.string.isRequired
};
