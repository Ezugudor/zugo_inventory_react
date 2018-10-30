import React from "react";



export class InputMaker {
  static makeTextInput(input) {
    return (
      <div className="question__input">
        <div className="question__input__wrapper">
          <input id="ddd" className="question__input" ></input>
        </div>
        {control()}
      </div>
    );
  }


  static makeTextArea(input) {
    return (
      <div className="question__input">
        <div className="question__input-box">
          <textarea id="ddd" className="question__input" />
          <p className="question__input-instruction"></p>
        </div>
        {control()}
      </div>
    );
  }


  static makeOptionInputs(input) {
    return (
     <div className="question__input">
      <div className="input__box">
        <div className="input__content">
          <div className="input__options">
            {makeOption()}
          </div>
        </div>
      </div>
     </div>
    );
  }

  static makeDropdown(input) {
    return (
     <div className="question__input">
      <div className="question__input__wrapper">
        <input id="ddd" className="question__input"></input>
        <div className="input__decoration-wrapper">
          <div className="input__decoration">
            <span className="input__icon"></span>
          </div>
        </div>
      </div>
      <div className="options__wrapper">
        <div className="options">
          <div className="options__content">
            {makeSelectItem()}
          </div>
        </div>
      </div>
     </div>
    );
  }

}

const makeOption= option => (
  <div className="option__wrapper">
    <div className="option">
      <div className="option__contents">
        <div className="option__icon">
          <div className="icon__wrapper">
            <span className="icon">Y</span>
          </div>
        </div>
        <div className="option__text">
          <div className="text">Yes</div>
        </div>
        <div className="option__decoration">
          <div className="decoration__wrapper">
            <span className="decoration">
              <i className="fa fa-good"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const makeSelectItem = option => (
  <div className="item__wrapper">
    <div className="item">
      <div className="item__content">
        <div className="item__text-wrapper">
          <div className="item__text">Some text</div>
        </div>
        <div className="item__deoration">
          <div className="item__decoration-wrapper">
            <span className="item__decoration">
              <i className="fa fa-good"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)


const control = () => (
  <div className="question__control">
    <button className="move-next">
      <span className="move-next__label">Ok</span>
      <span className="move-next__icon">
        <i className="fa fa-good"></i>
      </span>
    </button>
    <div className="nav-instruction">
      <p className="nav-instruction__text">
        press <strong>Enter</strong>
      </p>
    </div>
  </div>
)
