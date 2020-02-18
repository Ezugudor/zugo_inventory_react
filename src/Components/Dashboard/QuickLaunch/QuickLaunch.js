import { White, Red } from "../../Utils/Buttons";
import styles from "./QuickLaunch.module.css";
import { FileUpload, PreviewImage } from "../../Utils";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const QuickLaunch = props => (
  <div className={styles.QuickBtn}>
    <span className={`mdi mdi-plus`}></span>
    <ul className={styles.QuickLinks}>
      <li>
        <a href="/stocks">Add stock</a>
      </li>
      <li>
        <a href="/payment">Add payment</a>
      </li>
      <li>
        <a href="/supplysum">supply</a>
      </li>
    </ul>
  </div>
);

QuickLaunch.propTypes = {
  setUpdateUserDetail: PropTypes.func.isRequired,
  toggleEditBusiness: PropTypes.func.isRequired,
  showEditBusiness: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired
};
