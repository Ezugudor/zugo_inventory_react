import Style from "./AuthLayout.module.css";
import { AuthHeader } from "../Headers";

import React from "react";

export const AuthLayout = props => (
  <div className={Style.AuthLayout}>
    <AuthHeader />
    <main className={Style.MainContent}>
      <div className={Style.Banner}></div>
      <div className={Style.Content}>{props.children}</div>
    </main>
  </div>
);
