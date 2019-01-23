import Style from "../WithOptions.module.css";
import React, { Component } from "react";
import { NormalHouse } from "../Houses";

import PropTypes from "prop-types";
import { Option } from "../Option";

export class Gender extends Component {
  /**
   * default state of component
   */
  state = {
    options: [
      { label: "M", text: "Male", index: 0, picked: false },
      { label: "F", text: "Female", index: 1, picked: false }
    ]
  };
  /**
   * Save index of the selected option
   */
  pickOption = optionIndex => {
    const options = [...this.state.options];
    const modifiedOptions = options.map(option => {
      if (option.index === optionIndex) {
        const modifiedOption = { ...option };
        modifiedOption.picked = true;
        return modifiedOption;
      }
      const modifiedOption = { ...option };
      modifiedOption.picked = false;
      return modifiedOption;
    });
    this.setState({ options: modifiedOptions });
    this.props.handleClick();
  };

  render() {
    return (
      <NormalHouse el={this.props.el}>
        <div className={Style.answerWrapper}>
          <div className={Style.answerContent}>
            {this.state.options.map(option => (
              <Option
                picked={option.picked}
                pick={this.pickOption}
                index={option.index}
                label={option.label}
                key={option.index}
                text={option.text}
              />
            ))}
          </div>
        </div>
      </NormalHouse>
    );
  }
}

Gender.propTypes = {
  handleClick: PropTypes.func.isRequired,
  el: PropTypes.object.isRequired
};
