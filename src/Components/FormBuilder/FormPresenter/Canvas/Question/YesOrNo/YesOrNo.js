import Style from "../WithOptions.module.css";
import React, { Component } from "react";
import { NormalHouse } from "../Houses";
import { Option } from "../Option";
import PropTypes from "prop-types";

export class YesOrNo extends Component {
  state = {
    options: [
      { label: "Y", text: "Yes", index: 0, picked: false },
      { label: "N", text: "No", index: 1, picked: false }
    ]
  };

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
      <NormalHouse question={this.props.question}>
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

YesOrNo.propTypes = {
  handleClick: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};
