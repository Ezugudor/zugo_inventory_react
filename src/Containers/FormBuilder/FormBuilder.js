import { FormBuiderLayout } from "../../Hoc/Layouts";
import { FormBuilderView } from "../../Components/FormBuilder";
import React, { Component } from "react";

export class FormBuilder extends Component {
  render() {
    return (
      <FormBuiderLayout>
        <FormBuilderView />
      </FormBuiderLayout>
    );
  }
}
