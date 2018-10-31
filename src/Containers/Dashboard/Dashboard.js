import { Adminlayout } from '../../Hoc/Layouts';
import { Inbox } from '../../Components/Inbox';
import React, { Component } from 'react';
export class Dashboard extends Component {
  render() {
    return (
      <Adminlayout pageName="dashboard">
        <div className="dashboard">
          <Inbox />
        </div>
      </Adminlayout>
    );
  }
}
