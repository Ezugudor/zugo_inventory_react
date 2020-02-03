import Styles from "./Section.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Section = props => (
  <div className={Styles.Header}>
    {props.name ? <h1 className={Styles.SectionTitle}>{props.name}</h1> : null}
  </div>
);

Section.propTypes = {
  sectionData: PropTypes.object
};
