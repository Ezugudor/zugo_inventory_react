import { getNote } from "../../../utils";
import { InboxHeader } from "./Header";
import { InboxItem } from "./Item";
import PropTypes from "prop-types";
import React from "react";

export const Inbox = props => (
  <section>
    <InboxHeader
      processedCount={props.processed.count}
      unreadCount={props.pending.count}
      selectedTab={props.tabToShow}
      switchTab={props.switchTab}
    />
    {showResponse(props)}
  </section>
);

const showResponse = props => {
  switch (props.tabToShow) {
    case "processed":
      const { processed } = props;
      return processed.result.map(res => (
        <InboxItem
          formName={res.form.name}
          date={res.createdAt}
          note={getNote(res)}
          type="processed"
          key={res.id}
          id={res.id}
        />
      ));

    case "pending":
      const { pending } = props;
      return pending.result.map(res => (
        <InboxItem
          formName={res.form.name}
          date={res.createdAt}
          note={getNote(res)}
          type="pending"
          key={res.id}
          id={res.id}
        />
      ));

    default:
      return null;
  }
};

Inbox.ropTypes = {
  tabToShow: PropTypes.string.isRequired,
  processed: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired
};
