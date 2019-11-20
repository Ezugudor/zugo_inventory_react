import { AdminLayout } from "../../Hoc/Layouts";
import { FormTypesControls } from "./Controls";
import PropTypes from "prop-types";
import { Cards } from "./Cards";
import React from "react";
import Styles from "./FormTypesView.module.css";
import { Notification } from "../Utils";

export const FormTypeView = props => (
  <AdminLayout pageName="formType" currentUser={props.currentUser}>
    <div className={Styles.formType}>
      <FormTypesControls
        selectedTab={props.selectedTab}
        switchTab={props.switchTab}
      />
      <Cards formTypes={props.formTypes} viewForms={props.viewForms} />
    </div>
    <Notification title={"Default Title"} message={"Default Body Message"} />
  </AdminLayout>
);

FormTypeView.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  formTypes: PropTypes.array.isRequired,
  viewForms: PropTypes.func.isRequired,
  switchTab: PropTypes.func.isRequired
};
