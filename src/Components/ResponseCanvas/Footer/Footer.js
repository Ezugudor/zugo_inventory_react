import React from "react"
export const Footer = props => (
  <div className="canvas-footer">
    <div className="canvas-footer__content">
      <div className="progress">
        <p className="progress__text"> {props.answered} of {props.total} </p>
        <progress value={props.percentCompleted} max="100" className="progress__progress"></progress>
      </div>
      <div className="canvas__navigation">
        <button><i className="fa fa-angle-up"></i></button>
        <button><i className="fa fa-angle-down"></i></button>
      </div>
    </div>
  </div>
)