import { AdminSideNav } from "../../../Components/Navigations";
import Style from "./AdminLayout.module.css";
import { PrivateHeader } from "../Headers";
import { Aux } from "../../Auxiliary";
import React from "react";

export const Adminlayout = props => (
  <Aux>
    <PrivateHeader />
    <main className={Style.AdminLayout}>
      <AdminSideNav />
      <div className={Style.ChildContent}>{props.children}</div>
    </main>
  </Aux>
);
