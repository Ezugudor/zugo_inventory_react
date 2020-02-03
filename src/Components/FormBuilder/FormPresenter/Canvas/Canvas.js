import { calculateElementCount, getQuestions } from "../../../../utils";
import { getFirstSection, getNextSection } from "../../../../utils";
import { ResponseCanvas } from "../../../../core/responseCanvas";
import { renderQuestionFor } from "./Question";
import React, { Component } from "react";
import Style from "./Canvas.module.css";
import PropTypes from "prop-types";
import { Footer } from "./Footer";
import { Header } from "./Header";
import $ from "jquery";
window.jQuery = $;
require("../../../../plugins/nicescrollbar/nicescroll.js");

export class Canvas extends Component {
  state = {
    completedQuestion: 0,
    currentQuestion: null
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

    // $(".overflow_scroll").niceScroll({
    //   cursorcolor: "var(--color3)",
    //   cursorwidth: "15px",
    //   autohidemode: true,
    //   touchbehavior: false,
    //   grabcursorenabled: false,
    //   spacebarenabled: false
    // });
  }

  componentWillUnmount() {
    ResponseCanvas.unmountObservers();
  }

  componentDidUpdate() {
    this.setupCanvas();
  }

  componentWillUpdate() {
    // $(".overflow_scroll").niceScroll({
    //   cursorcolor: "var(--color3)",
    //   cursorwidth: "15px",
    //   autohidemode: true,
    //   touchbehavior: false,
    //   grabcursorenabled: false,
    //   spacebarenabled: false
    // });
  }

  handleTargetEnter = response => {
    const { element } = response;
    const data = element.dataset;
    element.classList.remove("InactiveElement");
    element.classList.add("ActivteElement");
    this.currentQuestion = data.questionId;
  };

  handleTargetExit = response => {
    response.element.classList.remove("ActivteElement");
    // Uncommenting the below is wrong .
    // Just bypassed for testing purposes.
    // response.element.classList.add("InactiveElement");
    response.element.classList.add("ActivteElement");
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
    this.setState({ currentQuestion: this.currentQuestion });
  };

  /**
   * Pull data about current question section
   */
  getSectionData = () => {
    const formQuestion = this.props.elements;
    const currentQuestion = this.state.currentQuestion;
    const firstSectionData = getFirstSection(formQuestion);

    if (!currentQuestion) return firstSectionData;
    const nextSectionData = getNextSection(formQuestion, currentQuestion);
    return nextSectionData ? nextSectionData : getFirstSection(formQuestion);
  };

  render() {
    const questions = getQuestions(this.props.elements);
    return (
      <div>
        {/* <section className={Style.HeaderSection}>
          <Header sectionData={this.getSectionData()} />
        </section> */}
        <section
          className={`${Style.InterectionSection} overflow_scroll auto_scroll`}
        >
          <div>
            <main className={`${Style.Canvas}`}>
              {questions.map(question =>
                renderQuestionFor({
                  question,
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
