import { AdminSideNav } from "../../../Components/Navigations";
import { AdminMiniSideNav } from "../../../Components/Navigations";
import Style from "./AdminLayout.module.css";
import { FormBuilderHeader } from "../Headers";
import PropTypes from "prop-types";
import { Aux } from "../../Auxiliary";
import { Logo } from "../../../Components/Utils";
import logoutIcon from "../../../img/logout.svg";
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
    <main className={Style.AdminLayout}>
      {getSideBar(props.currentUser, props)}
      <div className={Style.right}>
        <FormBuilderHeader save={props.save} formName={props.formName} />
        <div className={Style.ChildContent}>{props.children}</div>
      </div>
    </main>
  </Aux>
);

AdminLayout.propTypes = {
  pageName: PropTypes.string.isRequired
};
