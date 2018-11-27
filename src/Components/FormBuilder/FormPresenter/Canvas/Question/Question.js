import { YesOrNo } from "./YesOrNo";
import { Simple } from "./Simple";
import { Cards } from "./Cards";
import { Long } from "./Long";
import React from "react";

export const renderFormFor = ({ el, handleClick }) => {
  switch (el.type) {
    case "introduction":
      return null;
    case "section":
      return null;
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
