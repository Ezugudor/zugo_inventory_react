import styles from "./OfficialSignatories.module.css";
import { Signatory } from "./Signatory";
import PropTypes from "prop-types";
import React from "react";

export const OfficailSignatories = props => {
  const { initiator, approver } = props.processors;
  return (
    <div className={styles.signatories}>
      <div className={styles.initiator}>
        <h2 className={styles.heading}>Initiator</h2>
        {initiator.name ? (
          <Signatory
            name={initiator.name}
            email={initiator.email}
            date={initiator.dateOfApproval}
            signature={initiator.signatureUrl}
          />
        ) : (
          <div className={styles.emptyMessage}>Yet to sign.</div>
        )}
      </div>

      <div className={styles.approver}>
        <h2 className={styles.heading}>Approver</h2>
        {approver.name ? (
          <Signatory
            name={approver.name}
            email={approver.email}
            date={approver.dateOfApproval}
            signature={approver.signatureUrl}
          />
        ) : (
          <div className={styles.emptyMessage}>Yet to sign.</div>
        )}
      </div>
    </div>
  );
};

OfficailSignatories.propTypes = {
  processors: PropTypes.object.isRequired
};
