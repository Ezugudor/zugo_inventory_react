import { FormBuilderSideNav } from "../../../Components/Navigations";
import Style from "./FormBuilderLayout.module.css";
import { FormBuilderHeader } from "../Headers";
import { Aux } from "../../Auxiliary";
import PropTypes from "prop-types";
import React from "react";

export const FormBuiderLayout = props => (
  <Aux>
    <FormBuilderHeader save={props.save} />
    <main className={Style.Main}>
      <FormBuilderSideNav />
      <div className={Style.ChildContent}>{props.children}</div>
    </main>
  </Aux>
);

FormBuiderLayout.propTypes = {
  changeConfigWindow: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
};
