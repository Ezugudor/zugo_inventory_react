import { AdminSideNav } from "../../../Components/Navigations";
import { AdminMiniSideNav } from "../../../Components/Navigations";
import Style from "./AdminLayout.module.css";
import { FormBuilderHeader, PrivateHeader } from "../Headers";
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

const getHeader = props => {
  return props.pageName == "form_builder" ? (
    <FormBuilderHeader save={props.save} formName={props.formName} />
  ) : (
    <PrivateHeader formName={props.formName} />
  );
};
export const AdminLayout = props => (
  <Aux>
    <main className={Style.AdminLayout}>
      {getSideBar(props.currentUser, props)}
      <div className={Style.right}>
        {getHeader(props)}
        <div className={Style.ChildContent}>{props.children}</div>
      </div>
    </main>
  </Aux>
);

AdminLayout.propTypes = {
  pageName: PropTypes.string.isRequired
};
