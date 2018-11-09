import { Adminlayout } from "../../Hoc/Layouts";
import { Controls, Cards } from "../../Components/Form";
import React, { Component } from "react";

export class Form extends Component {
  render() {
    return (
      <Adminlayout>
        <div className="form">
          <Controls />
          <Cards />
        </div>
      </Adminlayout>
    );
  }
}
