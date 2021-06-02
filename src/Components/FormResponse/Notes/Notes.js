import Style from "./Notes.module.css";
import PropTypes from "prop-types";
import className from "classnames";
import moment from "moment";
import React from "react";

const getClass = (props, noter) => {
  const conditionalStyles = {};
  conditionalStyles[Style.responseLeft] =
    props.currentUser.email === noter.email;

  conditionalStyles[Style.responseRight] =
    props.currentUser.email !== noter.email;
  return className(Style.response, conditionalStyles);
};

export const Notes = props => (
  <section className="section__note">
    <h2 className={Style.info}>Notes</h2>
    <div className={Style.notes}>
      {props.notes.map(res => (
        <div className={getClass(props, res.notedBy)} key={res._id}>
          <p className={Style.responseAuthor}>{res.notedBy.name}</p>
          <p className={Style.responseText}>{res.note}</p>
          <p className={Style.responseMeta}>
            <span className="response__duration">
              {moment(res.date).format("[] h:mm a")} -{" "}
            </span>
            <span className="response__timestamps">
              {moment(res.date).format("DD MMM YYYY")}
            </span>
          </p>
        </div>
      ))}
    </div>
  </section>
);

Notes.propTypes = {
  currentUser: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired
};
