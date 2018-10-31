import { Canvas, Intro } from "../../Components/ResponseCanvas";
import React, { Component } from "react";

export class ResponseCanvas extends Component {
  state = {
    showCanvas: false
  };

  toggleCanvas = () => {
    this.setState((currentState, prevState) => ({
      showCanvas: !prevState.showCanvas
    }));
  };

  render() {
    return (
      <section>
        <Intro
          toggleCanvas={this.toggleCanvas}
          showCanvas={this.state.showCanvas}
        />
        <Canvas
          showCanvas={this.state.showCanvas}
          toggleCanvas={this.toggleCanvas}
        />
      </section>
    );
  }
}
