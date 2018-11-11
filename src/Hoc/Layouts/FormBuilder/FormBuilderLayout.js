import { FormBuilderSideNav } from "../../../Components/Navigations";
import Style from "./FormBuilderLayout.module.css";
import { FormBuilder } from "../Headers";
import { Aux } from "../../Auxiliary";
import React from "react";

const view = props => (
  <Aux>
    <FormBuilder />
    <main className={Style.Main}>
      <FormBuilderSideNav />
      <div className={Style.ChildContent}>{props.children}</div>
    </main>
  </Aux>
);

export const FormBuiderLayout = view;
