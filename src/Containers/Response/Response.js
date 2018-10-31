import { Notes, ResponseUi, ResponseControls } from '../../Components/Response';
import { Adminlayout } from '../../Hoc/Layouts';
import React, { Component } from 'react';
export class Response extends Component {
  render() {
    return (
      <Adminlayout pageTitle="Account Opening">
        <div className="response">
          <ResponseControls />
          <Notes />
          <ResponseUi />
        </div>
      </Adminlayout>
    );
  }
}
