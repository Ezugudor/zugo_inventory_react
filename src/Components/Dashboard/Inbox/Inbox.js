import { InboxHeader } from "./Header";
import { InboxItem } from "./Item";
import React from "react";

export const Inbox = props => (
  <section className="inbox__body">
    <InboxHeader />
    <InboxItem
      formName="Account Opening - Individual"
      date="10:22am April 12, 2018"
    />
    <InboxItem
      formName="GTBusiness Account - Corporate"
      note="Email is missing"
      date="10:22am April 12, 2018"
    />
  </section>
);
