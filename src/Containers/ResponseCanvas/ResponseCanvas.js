import { Canvas, Intro } from "../../Components/ResponseCanvas";
import React, { Component } from "react";

export class ResponseCanvas extends Component {
  render() {
    return (
      <section>
        <Intro></Intro>
        <Canvas></Canvas>
      </section>
    )
  }
}