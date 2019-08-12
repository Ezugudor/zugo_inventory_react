import { AdminLayout } from "../../Hoc/Layouts";
import { FormTypesControls } from "./Controls";
import PropTypes from "prop-types";
import { Cards } from "./Cards";
import React from "react";

export const FormTypeView = props => (
  <AdminLayout pageName="formType" currentUser={props.currentUser}>
    <FormTypesControls
      selectedTab={props.selectedTab}
      switchTab={props.switchTab}
    />
    <Cards formTypes={props.formTypes} viewForms={props.viewForms} />
  </AdminLayout>
);

FormTypeView.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  formTypes: PropTypes.array.isRequired,
  viewForms: PropTypes.func.isRequired,
  switchTab: PropTypes.func.isRequired
};
