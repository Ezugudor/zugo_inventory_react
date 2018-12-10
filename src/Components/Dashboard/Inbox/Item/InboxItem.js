import Style from "./InboxItem.module.css";
import React from "react";

export const InboxItem = props => (
  <div className={Style.inboxItem}>
    <div className={Style.response}>{props.formName}</div>
    <div className={Style.response}>{props.note}</div>
    <div className={Style.response}>{props.date}</div>
  </div>
);
