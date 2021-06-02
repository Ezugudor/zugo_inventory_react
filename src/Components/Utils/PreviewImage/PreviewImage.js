import styles from "./PreviewImage.module.css";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const PL = props => {
  return (
    <div className={styles.prevCont}>
      {props.imageURL ? (
        <img src={props.imageURL} alt="signature" className={styles.img} />
      ) : (
        <p className={props.styles}>
          <strong>{props.text || "No new Image yet."}</strong>
        </p>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    logoUrll: state.business.logoUrl
  };
};

export const PreviewImage = connect(mapStateToProps)(PL);
