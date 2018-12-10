import { AdminLayout } from "../../Hoc/Layouts";
// import Style from "./DashboardView.module.css";
import { Inbox } from "./Inbox";
import React from "react";

export const DashboardView = props => (
  <AdminLayout pageName="dashboard">
    <div className="dashboard">
      <Inbox />
    </div>
  </AdminLayout>
);
