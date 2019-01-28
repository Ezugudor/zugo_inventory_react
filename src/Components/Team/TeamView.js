import { AdminLayout } from "../../Hoc/Layouts";
import styles from "./TeamView.module.css";
import { Controls } from "./Controls";
import { Members } from "./Members";
import PropTypes from "prop-types";
import React from "react";

export const TeamView = props => (
  <AdminLayout pageName="team">
    <div className={styles.team}>
      <Controls />
      <Members />
    </div>
  </AdminLayout>
);

TeamView.propsTypes = {
  createNewUser: PropTypes.func.isRequired
};
