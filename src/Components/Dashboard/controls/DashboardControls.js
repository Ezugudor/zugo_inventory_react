import { DatePicker, InboxPagination } from "../../Utils";
import Style from "./DashboardControls.module.css";
import React from "react";

export const DashboardControls = props => (
  <section className={Style.controls}>
    <DatePicker />
    <InboxPagination />
  </section>
);
