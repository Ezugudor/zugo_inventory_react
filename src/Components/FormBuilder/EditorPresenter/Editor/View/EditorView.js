import IconStyle from "../../../../../styles/IconColor.module.css";
import Style from "./EditorView.module.css";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { imgToFontIcon } from "../../../../../utils";
import { connect } from "react-redux";
import {
  getNewForm,
  getBuilderState,
  getBusinessColor,
  getBusinessId,
  getProgressIndicator
} from "../../../../../store/selectors";
import { dragStart, dragStop } from "../../../../../store/actions";
import className from "classnames";

class Class extends Component {
  constructor(props) {
    super(props);
    this.innerElement = React.createRef();
    this.mouseDown = false;
  }
  state = {
    x: 0,
    y: 0
  };
  componentDidMount() {
    // this.setState({ x: this.innerElement.current.clientWidth });
    // document.addEventListener(
    //   "mousemove",
    //   function(e) {
    //     this.setState({
    //       x: e.clientX,
    //       y: e.clientY
    //     });
    //   }.bind(this)
    // );
  }

  buildParentStyle = props => {
    const conditionalStyle = {};
    conditionalStyle[Style.dndDestination] =
      props.builderState.currentDraggedElement.id === props.element.id;
    return className(Style.editorWrapper, conditionalStyle);
  };

  buildElemStyle = props => {
    const conditionalStyle = {};
    conditionalStyle[Style.dndTarget] =
      props.builderState.currentDraggedElement.id === props.element.id;
    return className(Style.editor, conditionalStyle);
  };

  render() {
    return (
      <div
        className={this.buildParentStyle(this.props)}
        ref={this.props.innerRef}
      >
        <div data-q-type="ddd" className={this.buildElemStyle(this.props)}>
          <div className={Style.dragIconCont} {...this.props.dragHandleProps}>
            <div className={Style.dragIcon}></div>
          </div>
          <div className={Style.iconWrapper}>
            <div
              className={`${Style.iconContents} ${
                IconStyle[this.props.element.type]
              }`}
            >
              <div className={Style.iconHolder}>
                {imgToFontIcon(this.props.element.type, Style.Icon)}
              </div>
              {/* <div className={Style.iconHolder}></div> */}
            </div>
          </div>
          <div className={Style.question}>
            <div className={Style.questionBox}>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  builderState: getBuilderState(state),
  newForm: getNewForm(state),
  businessColor: getBusinessColor(state),
  businessId: getBusinessId(state),
  progress: getProgressIndicator(state)
});

export const EditorView = connect(
  mapStateToProps,
  { dragStart, dragStop }
)(Class);
