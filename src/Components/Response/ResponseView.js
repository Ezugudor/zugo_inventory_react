import { AdminLayout } from "../../Hoc/Layouts";
import { ResponseControls } from "./Controls";
import Style from "./Response.module.css";
import { Answers } from "./Answers";
import { Notes } from "./Notes";
import React from "react";

export const ResponseView = props => (
  <AdminLayout pageName="Account Opening">
    <div className={Style.response}>
      <ResponseControls />
      <Notes />
      <Answers />
    </div>
  </AdminLayout>
);
