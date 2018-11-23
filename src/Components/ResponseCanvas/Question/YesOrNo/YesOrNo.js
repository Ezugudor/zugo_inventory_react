import { FieldSetHouse } from "../Houses";
import Style from "./YesOrNo.module.css";
import React, { Component } from "react";
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

YesOrNo.propTypes = {
  position: PropTypes.number.isRequired,
  increaseCompletedQuestion: PropTypes.func.isRequired
};
