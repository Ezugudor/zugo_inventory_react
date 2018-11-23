import { MultiSelect, YesOrNo, Simple, DropDown, Long } from "./Question";
import { ResponseCanvas } from "../../core/responseCanvas";
import React, { Component } from "react";
import Style from "./Canvas.module.css";
import classNames from "classnames";
import { Footer } from "./Footer";
import { Header } from "./Header";

export class Canvas extends Component {
  state = {
    completedQuestion: 0,
    currentQuestion: "last"
  };

  componentDidMount() {
    const targets = document.querySelectorAll('[data-question="true"]');
    ResponseCanvas.setUp({ targets, canvasClass: Style.Canvas })
      .onTargetEnter(this.handleTargetEnter)
      .onTargetExit(this.handleTargetExit);
    this.canvas = document.querySelector(`.${Style.Canvas}`);
    this.firstInput = document.querySelector('[data-q-position="1"]');
  }

  componentWillUnmount() {
    ResponseCanvas.unmountObservers();
  }

  updateCurrentQuestion = position => {};

  handleTargetEnter = response => {
    const { element } = response;
    element.classList.remove("InactiveElement");
    element.classList.add("ActivteElement");
    const input = element.querySelector('[data-input="true"]');
    const questionPosition = element.querySelector("[data-q-position]");
    console.log(questionPosition.dataset.qPosition);
    if (input && this.state.completedQuestion === 0) {
      this.firstInput.focus();
    } else if (input) {
      input.focus();
    }
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
      this.canvas.scrollBy(0, 270);
    } else if (direction === "up") {
      this.canvas.scrollBy(0, -270);
    }
  };

  render() {
    return (
      <section className={getSectionClassName(this.props)}>
        <section className={Style.HeaderSection}>
          <Header />
        </section>
        <section className={Style.InterectionSection}>
          <div className={Style.CanvasWrapper}>
            <div className={Style.Canvas}>
              <main>
                <Simple
                  increaseCompletedQuestion={this.increaseCompletedQuestion}
                  position={1}
                />
                <YesOrNo
                  increaseCompletedQuestion={this.increaseCompletedQuestion}
                  position={2}
                />
                <Long
                  increaseCompletedQuestion={this.increaseCompletedQuestion}
                  position={3}
                />

                <MultiSelect
                  increaseCompletedQuestion={this.increaseCompletedQuestion}
                  position={4}
                />
                <MultiSelect
                  increaseCompletedQuestion={this.increaseCompletedQuestion}
                  position={5}
                />
                <MultiSelect
                  increaseCompletedQuestion={this.increaseCompletedQuestion}
                  position={6}
                />
                <MultiSelect
                  increaseCompletedQuestion={this.increaseCompletedQuestion}
                  position={7}
                />
                <MultiSelect
                  increaseCompletedQuestion={this.increaseCompletedQuestion}
                  position={8}
                />
              </main>
            </div>
          </div>
        </section>
        <section className={Style.FooterSection}>
          <Footer
            completedQuestion={this.state.completedQuestion}
            goToNextQuestion={this.goToNextQuestion}
            totalQuestion="4"
          />
        </section>
      </section>
    );
  }
}

const getSectionClassName = props => {
  const conditionalClasses = {};
  conditionalClasses[Style.CanvasSectionVisible] = props.showCanvas;
  return classNames(Style.CanvasSection, conditionalClasses);
};
