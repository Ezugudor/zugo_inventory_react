import style from "./DropDownOption.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const getWrapperClass = props => {
  const conditionalClasses = {};
  conditionalClasses[style.inactivIconWrapper] = !props.picked;
  conditionalClasses[style.activIconWrapper] = props.picked;
  return classNames(style.iconWrapper, conditionalClasses);
};

export const Option = props => (
  <div className={style.OptionWrapper} onClick={() => props.pick(props.index)}>
    <div className={style.OptionContents}>
      <div className={style.OptionBox}>
        <div className={style.Option}>
          <div className={style.OptionTextWrapper}>
            <div className={style.OptionBox}>
              <div className={style.OtionText}>{props.text.name}</div>
              {console.log("popular text", props.text)}
            </div>
            <div className={getWrapperClass(props)}>
              <div className={style.optionIconBox}>
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
);

Option.propTypes = {
  pick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  picked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};
