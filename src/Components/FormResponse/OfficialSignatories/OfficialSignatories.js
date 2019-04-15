import styles from "./OfficialSignatories.module.css";
import { Signatory } from "./Signatory";
import PropTypes from "prop-types";
import React from "react";

export const OfficailSignatories = props => {
  const { initiator, approver } = props.processors;
  return (
    <div className={styles.signatories}>
      <div className={styles.initiator}>
        <h2>Initiator</h2>
        {initiator.name ? (
          <Signatory
            name={initiator.name}
            email={initiator.email}
            date={initiator.dateOfApproval}
            signature={initiator.signatureUrl}
          />
        ) : (
          <p>
            <strong>Yet to sign.</strong>
          </p>
        )}
      </div>

      <div>
        <h2>Approver</h2>
        {approver.name ? (
          <Signatory
            name={approver.name}
            email={approver.email}
            date={approver.dateOfApproval}
            signature={approver.signatureUrl}
          />
        ) : (
          <p>
            <strong>Yet to sign.</strong>
          </p>
        )}
      </div>
    </div>
  );
};

OfficailSignatories.propTypes = {
  processors: PropTypes.object.isRequired
};
