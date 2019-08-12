import styles from "./PreviewLogo.module.css";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const PL = props => {
  // const { initiator, approver } = props.processors;
  let logo = props.logoUrl ? props.logoUrl : props.logoUrll;

  return (
    <div className={styles.prevCont}>
      {/* <h2>Preview</h2> */}
      {logo ? (
        <img src={logo} alt="signature" className={styles.img} />
      ) : (
        <p>
          <strong>No new logo yet.</strong>
        </p>
      )}
    </div>
  );
};

// PreviewLogo.propTypes = {
//   // processors: PropTypes.object.isRequired
// };

const mapStateToProps = state => {
  console.log("adaaa", state);
  return {
    logoUrll: state.business.logoUrl
  };
};

export const PreviewLogo = connect(mapStateToProps)(PL);
