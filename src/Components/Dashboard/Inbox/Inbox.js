import { getNote } from "../../../utils";
import { InboxHeader } from "./Header";

import PropTypes from "prop-types";
import { InboxItem } from "./Item";
import React from "react";

export const Inbox = props => (
  <section>
    <InboxHeader
      unreadCount={props.unread.count}
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
          key={res._id}
          id={res._id}
        />
      ));

    case "unread":
      const { unread } = props;
      return unread.result.map(res => (
        <InboxItem
          formName={res.form.name}
          date={res.createdAt}
          note={getNote(res)}
          key={res._id}
          id={res._id}
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
