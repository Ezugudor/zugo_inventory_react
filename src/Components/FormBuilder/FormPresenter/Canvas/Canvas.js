import { ResponseCanvas } from "../../../../core/responseCanvas";
import { calculateElementCount } from "../../../../utils";
import { renderFormFor } from "./Question";
import React, { Component } from "react";
import Style from "./Canvas.module.css";
import PropTypes from "prop-types";
import { Footer } from "./Footer";
import { Header } from "./Header";

export class Canvas extends Component {
  state = {
    completedQuestion: 0,
    currentQuestion: "last"
  };

  setupCanvas = () => {
    const targets = document.querySelectorAll('[data-question="true"]');
    if (targets.length) {
      ResponseCanvas.setUp({ targets, canvasClass: Style.Canvas })
        .onTargetEnter(this.handleTargetEnter)
        .onTargetExit(this.handleTargetExit);
      this.canvas = document.querySelector(`.${Style.Canvas}`);
    }
  };

  componentDidMount() {
    this.setupCanvas();
  }

  componentWillUnmount() {
    ResponseCanvas.unmountObservers();
  }

  componentDidUpdate() {
    this.setupCanvas();
  }

  handleTargetEnter = response => {
    const { element } = response;
    console.log(response);
    element.classList.remove("InactiveElement");
    element.classList.add("ActivteElement");
  };

  handleTargetExit = response => {
    response.element.classList.remove("ActivteElement");
    response.element.classList.add("InactiveElement");
  };

  increaseCompletedQuestion = () => {
    const completedQuestion = this.state.completedQuestion + 1;
    this.setState({ completedQuestion });
    this.goToNextQuestion();
  };

  goToNextQuestion = (direction = "down") => {
    if (direction === "down") {
      this.canvas.scrollBy(0, 280);
    } else if (direction === "up") {
      this.canvas.scrollBy(0, -280);
    }
  };

  render() {
    return (
      <div>
        <section className={Style.HeaderSection}>
          <Header />
        </section>
        <section className={Style.InterectionSection}>
          <div className={Style.Canvas}>
            <main>
              {this.props.elements.map(el =>
                renderFormFor({
                  el,
                  handleClick: this.increaseCompletedQuestion
                })
              )}
            </main>
          </div>
        </section>
        <section className={Style.FooterSection}>
          <Footer
            totalQuestion={calculateElementCount(this.props.elements)}
            completedQuestion={this.state.completedQuestion}
            goToNextQuestion={this.goToNextQuestion}
          />
        </section>
      </div>
    );
  }
}

Canvas.propTypes = {
  elements: PropTypes.array.isRequired
};
