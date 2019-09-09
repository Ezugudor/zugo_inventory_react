import styles from "./Signatory.module.css";
import PropTypes from "prop-types";
import React from "react";
import { Email, User, Date, Phone, Signature } from "../../../../utils";
import { Address } from "../../../../utils";

export const Signatory = props => (
  <div>
    <div className={styles.item}>
      <div className={styles.iconHolder}>
        <User style={`${styles.icon}`} />
      </div>
      <div>
        <p className={styles.questionText}>{props.name}</p>
      </div>
    </div>

    <div className={styles.item}>
      <div className={styles.iconHolder}>
        <Email style={`${styles.icon}`} />
      </div>
      <div>
        <p className={styles.questionText}>{props.email}</p>
      </div>
    </div>

    <div className={styles.item}>
      <div className={styles.iconHolder}>
        <Date style={`${styles.icon}`} />
      </div>
      <div>
        <p className={styles.questionText}>{props.date}</p>
      </div>
    </div>

    <div className={styles.item}>
      <div className={styles.iconHolder}>
        <Signature style={`${styles.icon}`} />
      </div>
      <div>
        <div className={styles.signatureWrapper}>
          <img
            src={props.signature}
            alt="signature"
            className={styles.signature}
          />
        </div>
      </div>
    </div>
  </div>
);

Signatory.props = {
  signature: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
