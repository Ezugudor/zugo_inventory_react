import { Members, TeamControls } from '../../Components/Team';
import { Adminlayout } from '../../Hoc/Layouts';
import React, { Component } from 'react';

export class Team extends Component {
  render() {
    return (
      <Adminlayout pageName="team">
        <div className="team">
          <TeamControls />
          <Members />
        </div>
      </Adminlayout>
    );
  }
}
