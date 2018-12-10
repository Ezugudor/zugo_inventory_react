import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./DashboardView.module.css";
import { DashboardControls } from "./controls";
import { Inbox } from "./Inbox";
import React from "react";

export const DashboardView = props => (
  <AdminLayout pageName="dashboard">
    <div className={Style.dashboard}>
      <DashboardControls />
      <Inbox />
    </div>
  </AdminLayout>
);
