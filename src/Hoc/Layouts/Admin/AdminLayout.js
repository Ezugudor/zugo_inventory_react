import { AdminSideNav } from "../../../Components/Navigations";
import { AdminMiniSideNav } from "../../../Components/Navigations";
import Style from "./AdminLayout.module.css";
import { PrivateHeader } from "../Headers";
import PropTypes from "prop-types";
import { Aux } from "../../Auxiliary";
import React from "react";

const getSideBar = (currentUser, props) => {
  return currentUser && currentUser.role !== "admin" ? (
    <AdminMiniSideNav pageName={props.pageName} />
  ) : (
    <AdminSideNav pageName={props.pageName} />
  );
};
export const AdminLayout = props => (
  <Aux>
    <PrivateHeader />
    <main className={Style.AdminLayout}>
      {console.log("from componnets checking the prop value", props)}
      {getSideBar(props.currentUser, props)}
      <div className={Style.ChildContent}>{props.children}</div>
    </main>
  </Aux>
);

AdminLayout.propTypes = {
  pageName: PropTypes.string.isRequired
};
