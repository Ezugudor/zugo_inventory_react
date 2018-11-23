import Style from "./MultiSelect.module.css";
import { FieldSetHouse } from "../Houses";
import React, { Component } from "react";
import { Option } from "../Option";
import PropTypes from "prop-types";

export class MultiSelect extends Component {
  state = {
    options: [
      { label: "B", text: "Another", index: 1, picked: false },
      { label: "A", text: "Hello", index: 0, picked: false },
      { label: "C", text: "Third", index: 2, picked: false }
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
    this.props.increaseCompletedQuestion();
  };

  render() {
    return (
      <FieldSetHouse {...this.props}>
        <div className={Style.FieldSetAnswerWrapper}>
          <div className={Style.FieldSetAnswerContents}>
            <div className={Style.Wrapper}>
              <div>
                <div className={Style.FieldSetAnswerDecoration}>
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
        </div>
      </FieldSetHouse>
    );
  }
}

MultiSelect.propTypes = {
  increaseCompletedQuestion: PropTypes.func.isRequired
};
