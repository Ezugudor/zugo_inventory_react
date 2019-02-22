import { FormBuilderSideNav } from "../../../Components/Navigations";
import Style from "./FormBuilderLayout.module.css";
import { FormBuilderHeader } from "../Headers";
import { Aux } from "../../Auxiliary";
import PropTypes from "prop-types";
import React from "react";

export const FormBuiderLayout = props => (
  <Aux>
    <FormBuilderHeader save={props.save} formName={props.formName} />
    <main className={Style.Main}>
      <FormBuilderSideNav
        changeConfigWindow={props.changeConfigWindow}
        settingsWindowName={props.settingsWindowName}
      />
      <div className={Style.ChildContent}>{props.children}</div>
    </main>
  </Aux>
);

FormBuiderLayout.propTypes = {
  settingsWindowName: PropTypes.string.isRequired,
  changeConfigWindow: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired
};
