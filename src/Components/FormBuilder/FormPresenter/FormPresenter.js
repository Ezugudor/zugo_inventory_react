import Style from "./FormPresenter.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Canvas } from "./Canvas";
import { Intro } from "./Intro";

export class FormPresenter extends Component {
  state = {
    showIntro: true
  };

  toggleIntro = () => {
    this.setState(prevState => ({
      showIntro: !prevState.showIntro
    }));
  };

  containsIntro = () => {
    return this.props.elements.find(el => el.type === "introduction");
  };

  render() {
    return (
      <section className={Style.formPresenter}>
        {this.state.showIntro && this.containsIntro() ? (
          <section className={Style.introSection}>
            <Intro toggleIntro={this.toggleIntro} />
          </section>
        ) : (
          <section className={Style.canvasSection}>
            <Canvas {...this.props} />
          </section>
        )}
      </section>
    );
  }
}

FormPresenter.propTypes = {
  elements: PropTypes.array.isRequired
};
