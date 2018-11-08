import { Cards, Controls } from "../../Components/FormTypes";
import { Adminlayout } from "../../Hoc/Layouts";
import React, { Component } from "react";

export class FormTypes extends Component {
  render() {
    return (
      <Adminlayout pageName="formType">
        <div className="formType">
          <Controls />
          <Cards />
        </div>
      </Adminlayout>
    );
  }
}
