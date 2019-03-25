import styles from "./Signatory.module.css";
import PropTypes from "prop-types";
import React from "react";

export const Signatory = props => (
  <div>
    <div className={styles.item}>
      <div className={`${styles.decoration} ${styles.name}`}>
        <div className={styles.iconHolder}>
          <img className={styles.icon} src="/img/name.svg" alt="name" />
        </div>
      </div>
      <div>
        <p className={styles.questionText}>{props.name}</p>
      </div>
    </div>

    <div className={styles.item}>
      <div className={`${styles.decoration} ${styles.email}`}>
        <div className={styles.iconHolder}>
          <img className={styles.icon} src="/img/email.svg" alt="email" />
        </div>
      </div>
      <div>
        <p className={styles.questionText}>{props.email}</p>
      </div>
    </div>

    <div className={styles.item}>
      <div className={`${styles.decoration} ${styles.date}`}>
        <div className={styles.iconHolder}>
          <img className={styles.icon} src="/img/date.svg" alt="date" />
        </div>
      </div>
      <div>
        <p className={styles.questionText}>{props.date}</p>
      </div>
    </div>

    <div className={styles.item}>
      <div className={`${styles.decoration} ${styles.sign}`}>
        <div className={styles.iconHolder}>
          <img
            className={styles.icon}
            src="/img/signature.svg"
            alt="signature"
          />
        </div>
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

Signatory.proptypes = {
  signature: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
