import styles from "./Signatory.module.css";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { previewImage } from "../../../../store/actions/app";
import { Email, User, Date, Phone, Signature } from "../../../../utils";
import { Address } from "../../../../utils";

export const Signatoryy = props => (
  <div>
    <div className={styles.item}>
      <div className={styles.iconHolder}>
        <div
          className={styles.avatarCont}
          onClick={e => props.callPreviewImage(props.userInfo)}
        >
          <img src={props.userInfo.avatar} className={styles.avatar} />
        </div>
      </div>
      <div>
        <p className={`${styles.questionText} ${styles.uname}`}>{props.name}</p>
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

const mapDispatchToProps = dispatch => ({
  callPreviewImage(account) {
    const cloneAccount = { ...account };
    cloneAccount.imageURL = account.avatar;
    account = cloneAccount;
    dispatch(previewImage(account));
  }
});

export const Signatory = connect(
  null,
  mapDispatchToProps
)(Signatoryy);

Signatory.props = {
  signature: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
