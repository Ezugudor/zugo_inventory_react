import { buildOptionFromArray } from "../../../../../../utils";
import Style from "../WithOptions.module.css";
import { NormalHouse } from "../Houses";
import React, { Component } from "react";
import { Option } from "../Option";
import PropTypes from "prop-types";

export class MultiChoice extends Component {
  /**
   * default state of component
   */
  state = {
    showOptions: false,
    pickedIndex: -1,
    value: ""
  };

  /**
   * Save index of the selected option
   */
  pickOption = pickedIndex => {
    this.setState({ pickedIndex });
    this.props.handleClick();
  };

  /**
   * transform question children to option object for the UI
   */
  getOptions = () => {
    const options = buildOptionFromArray(this.props.el.children);
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
      <NormalHouse {...this.props}>
        <div className={Style.answerWrapper}>
          <div className={Style.answerContents}>
            <div className={Style.Wrapper}>
              {this.getOptions().map(option => (
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
      </NormalHouse>
    );
  }
}

MultiChoice.propTypes = {
  handleClick: PropTypes.func.isRequired,
  el: PropTypes.object.isRequired
};
