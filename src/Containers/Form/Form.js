import { Adminlayout } from '../../Hoc/Layouts';
import { Cards } from '../../Components/Form';
import React, { Component } from 'react';

export class Form extends Component {
  render() {
    return (
      <Adminlayout>
        <div className="form">
          <Cards />
        </div>
      </Adminlayout>
    );
  }
}
