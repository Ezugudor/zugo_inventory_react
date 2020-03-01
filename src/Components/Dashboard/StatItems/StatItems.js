import styles from "./StatItems.module.css";
import { Customers } from "./Customers";
import { Debts } from "./Debts";
import { Payments } from "./Payments";
import { Outlets } from "./Outlets";
import PropTypes from "prop-types";
import React from "react";

export const StatItems = props => (
  <section className={styles.StatItems}>
    <div class="col-md-3">
      <Debts outlets={props.outlets} />
    </div>

    <div class="col-md-3">
      <Payments creditPayment={props.creditPayment} />
    </div>

    <div class="col-md-3">
      <Outlets outlets={props.outlets} />
    </div>

    <div class="col-md-3">
      <Customers customers={props.customers} />
    </div>
  </section>
);

StatItems.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
