import { FieldSetHouse } from "../Houses";
import React, { Component } from "react";
import Style from "./Cards.module.css";
import PropTypes from "prop-types";
import { Option } from "../Option";
export class Cards extends Component {
  state = {
    options: [
      { label: "A", text: "Master", index: 0, picked: false },
      { label: "B", text: "Visa", index: 1, picked: false }
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
      <FieldSetHouse el={this.props.el}>
        <div className={Style.fieldSetAnswerWrapper}>
          <div className={Style.fieldSetAnswerContents}>
            <div>
              <div className={Style.fieldSetAnswerDecoration}>
                <div className={Style.DefaultStyle} />
              </div>
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
        </div>
      </FieldSetHouse>
    );
  }
}

Cards.propTypes = {
  handleClick: PropTypes.func.isRequired,
  el: PropTypes.object.isRequired
};
