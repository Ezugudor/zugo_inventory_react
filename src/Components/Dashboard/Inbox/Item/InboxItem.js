import Style from "./InboxItem.module.css";
import PropTypes from "prop-types";
import React from "react";

export const InboxItem = props => (
  <a
    href={`/response/${props.type}/${props.id}`}
    className={Style.responseLink}
  >
    <div className={Style.inboxItem}>
      <div className={Style.response}>{props.formName}</div>
      <div className={Style.response}>{props.note}</div>
      <div className={Style.response}>{props.date}</div>
    </div>
  </a>
);

InboxItem.propTypes = {
  formName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  note: PropTypes.string
};
