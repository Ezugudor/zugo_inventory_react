import Style from "./Option.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const wrapperClass = props => {
  const conditionalClasses = {};
  conditionalClasses[Style.inactivIconWrapper] = !props.picked;
  conditionalClasses[Style.activIconWrapper] = props.picked;
  return classNames(Style.iconWrapper, conditionalClasses);
};

export const Option = props => (
  <div className={Style.optionRoot} onClick={() => props.pick(props.index)}>
    <div className={Style.optionWrapper}>
      <div className={Style.optionContents}>
        <div className={Style.option}>
          <div className={Style.optionContent}>
            <div className={Style.optionDecoration}>
              <div className={Style.optionLabelBox}>
                <div className={Style.optionLabelDecoration}>
                  <span className={Style.optionLabelIcon}>{props.label}</span>
                </div>
              </div>
              <div className={Style.optionTextBox}>
                <div className={Style.optionText}>{props.text}</div>
              </div>
              <div className={wrapperClass(props)}>
                <div className={Style.optionIconBox}>
                  <span>
                    <img src="/img/picked-green.svg" alt="picked" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Option.propTypes = {
  pick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  picked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
};
