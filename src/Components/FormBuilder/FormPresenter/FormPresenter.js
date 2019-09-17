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
    return this.setState(prevState => ({
      showIntro: !prevState.showIntro
    }));
  };

  getIntro = () => {
    console.log("view intro before", this.props.elements);
    return this.props.elements.find(el => el.type === "introduction");
  };

  render() {
    const questionIntro = this.getIntro();
    return (
      <section className={Style.formPresenter}>
        {this.state.showIntro && questionIntro ? (
          <section className={Style.introSection}>
            <Intro
              toggleIntro={this.toggleIntro}
              formName={this.props.formName}
              questionIntro={questionIntro}
              deleteQuestion={this.props.deleteQuestion}
              elements={this.props.elements}
              setCurrentEditor={this.props.setCurrentEditor}
              toggleConfigModal={this.props.toggleConfigModal}
            />
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
  formName: PropTypes.string.isRequired,
  elements: PropTypes.array.isRequired
};
