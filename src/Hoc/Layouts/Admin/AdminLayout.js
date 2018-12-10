import { AdminSideNav } from "../../../Components/Navigations";
import Style from "./AdminLayout.module.css";
import { PrivateHeader } from "../Headers";
import PropTypes from "prop-types";
import { Aux } from "../../Auxiliary";
import React from "react";

export const AdminLayout = props => (
  <Aux>
    <PrivateHeader />
    <main className={Style.AdminLayout}>
      <AdminSideNav pageName={props.pageName} />
      <div className={Style.ChildContent}>{props.children}</div>
    </main>
  </Aux>
);

AdminLayout.propTypes = {
  pageName: PropTypes.string.isRequired
};
