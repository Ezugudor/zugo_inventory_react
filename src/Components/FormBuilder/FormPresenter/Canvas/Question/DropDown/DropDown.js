import { buildOptionFromArray } from "../../../../../../utils";
import Style from "./DropDown.module.css";
import { NormalHouse } from "../Houses";
import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Option } from "./Option";

const getOptionClass = showOptions => {
  const conditionalStyle = {};
  conditionalStyle[Style.InactiveWrapper] = !showOptions;
  return classNames(Style.AnswerOptionsWrapper, conditionalStyle);
};

export class DropDown extends Component {
  /**
   * default state of component
   */
  state = {
    showOptions: false,
    pickedIndex: -1,
    value: ""
  };

  /**
   * expand/Close Option list
   */
  toggleOptions = () => {
    this.setState(preState => ({ showOptions: !preState.showOptions }));
  };

  /**
   * Save index of the selected option
   */
  selectOption = pickedIndex => {
    const options = this.getOptions();
    this.setState({
      value: options[pickedIndex].text,
      showOptions: false,
      pickedIndex
    });
    this.props.handleClick();
  };

  /**filter option by some value */
  filterOptions = e => {
    this.setState({
      value: e.target.value,
      showOptions: true
    });
  };

  /**
   * transform question children to option object for the UI
   */
  getOptions = () => {
    const filterText = this.state.value;

    const options = buildOptionFromArray(
      this.props.question.children,
      filterText
    );
    const { pickedIndex } = this.state;
    if (pickedIndex === -1) return options;

    const modifiedOptions = options.map(option => {
      const modifiedOption = { ...option };
      if (option.index === pickedIndex) {
        modifiedOption.picked = true;
        return modifiedOption;
      }
      modifiedOption.picked = false;
      return modifiedOption;
    });

    return modifiedOptions;
  };

  render() {
    return (
      <NormalHouse question={this.props.question}>
        <div className={Style.AnswerWrapper}>
          <div className={Style.AnswerContents} tabIndex="-1">
            <div className={Style.AnswerBox}>
              <div className={Style.AnswerText}>
                <input
                  className={Style.Answer}
                  value={this.state.value}
                  onChange={this.filterOptions}
                />
                <div className={Style.AnswerDecorationWrapper}>
                  <div className={Style.AnswerDecoration}>
                    <span onClick={this.toggleOptions}>
                      <i className="fa fa-angle-down" />
                    </span>
                  </div>
                </div>
              </div>
              <div className={getOptionClass(this.state.showOptions)}>
                <div className={Style.OptionsBox}>
                  {this.getOptions(this.props.question.children).map(option => (
                    <Option
                      pick={this.selectOption}
                      picked={option.picked}
                      index={option.index}
                      key={option.index}
                      text={option.text}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </NormalHouse>
    );
  }
}

DropDown.propTypes = {
  handleClick: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};
