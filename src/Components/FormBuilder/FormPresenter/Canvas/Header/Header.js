import Styles from "./Header.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Header = props => (
  <div className={Styles.Header}>
    {props.sectionData ? (
      <h1 className={Styles.SectionTitle}>{props.sectionData.name}</h1>
    ) : null}
  </div>
);

Header.propTypes = {
  sectionData: PropTypes.object
};
