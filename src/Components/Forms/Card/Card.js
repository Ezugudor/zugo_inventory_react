import Style from "./Card.module.css";
import PropTypes from "prop-types";
import React from "react";
import className from "classnames";
export const Card = props => {
  let gotoEdit = () => {
    props.showBuilderEdit(props.formId, props.form.workspace.id);
  };
  console.log("formmm", props.form);
  let closeBtnStyle = () => {
    const styles = {};
    styles[Style.closeBtnVisibility] = !props.editMode;
    return className(Style.closeBtn, styles);
  };
  return (
    <div className={Style.Card} onClick={gotoEdit}>
      <a
        href="#"
        className={closeBtnStyle()}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          props.setFormToDelete(props.form);
        }}
      >
        <i className={`${Style.closeIcon} ion ion-close-circled`}></i>
      </a>
      <div className={Style.Body}>
        <div className={Style.Text}>
          <span className={Style.name}>{props.form.name}</span>
          <br />
          {props.form.published ? (
            <span className={`${Style.status} ${Style.live}`}>Public</span>
          ) : (
            <span className={Style.status}>Private</span>
          )}
        </div>
      </div>
    </div>
  );
};
Card.propType = {
  form: PropTypes.object.isRequired
};
