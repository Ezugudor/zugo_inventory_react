import { MultiSelect } from "./MultiSelect";
import { Statement } from "./Statement";
import { DropDown } from "./DropDown";
import { Picture } from "./Picture";
import { YesOrNo } from "./YesOrNo";
import { Simple } from "./Simple";
import { Cards } from "./Cards";
import { Long } from "./Long";
import React from "react";

export const renderQuestionFor = ({ el, handleClick }) => {
  switch (el.type) {
    case "introduction":
      return null;

    case "section":
      return null;

    case "multichoice":
      return (
        <MultiSelect handleClick={handleClick} key={el.position} el={el} />
      );

    case "statement":
      return <Statement el={el} handleClick={handleClick} key={el.position} />;

    case "dropdown":
      return <DropDown el={el} handleClick={handleClick} key={el.position} />;

    case "sign":
      return <Picture el={el} handleClick={handleClick} key={el.position} />;

    case "picture":
      return <Picture el={el} handleClick={handleClick} key={el.position} />;

    case "creditcards":
      return <Cards el={el} handleClick={handleClick} key={el.position} />;

    case "yesorno":
      return <YesOrNo el={el} handleClick={handleClick} key={el.position} />;

    case "longtext":
      return <Long el={el} handleClick={handleClick} key={el.position} />;

    default:
      return <Simple el={el} handleClick={handleClick} key={el.position} />;
  }
};
