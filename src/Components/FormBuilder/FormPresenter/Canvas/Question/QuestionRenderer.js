import { MultiChoice } from "./MultiChoice";
import { Statement } from "./Statement";
import { DropDown } from "./DropDown";
import { YesOrNo } from "./YesOrNo";
import { Picture } from "./Picture";
import { Simple } from "./Simple";
import { Gender } from "./Gender";
import { Cards } from "./Cards";
import { Long } from "./Long";
import { NormalHouse } from "./Houses";
import React from "react";

const renderCompactChildren = (question, handleClick) => {
  switch (question.type) {
    case "dropdown":
      return (
        <DropDown
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );
    case "longtext":
      return (
        <Long
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );
    default:
      return (
        <Simple
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );
  }
};
export const renderQuestionFor = ({ question, handleClick }) => {
  switch (question.type) {
    case "introduction":
      return null;

    case "section":
      return null;

    case "multichoice":
      return (
        <MultiChoice
          handleClick={handleClick}
          key={question.position}
          question={question}
        />
      );
    case "address":
    case "branch":
      return (
        <div>
          <NormalHouse question={question} />
          <div>
            {/* dont display any field instead loop through the children and fill */}
            {console.log("presenter question", question)}
            {question.children.map(elem => {
              return renderCompactChildren(elem, handleClick);
            })}
          </div>
        </div>
      );
    case "statement":
      return (
        <Statement
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );

    case "dropdown":
      return (
        <DropDown
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );

    case "signature":
      return (
        <Picture
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );

    case "passport":
      return (
        <Picture
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );

    case "creditcards":
      return (
        <Cards
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );

    case "gender":
      return (
        <Gender
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );

    case "yesorno":
      return (
        <YesOrNo
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );

    case "longtext":
      return (
        <Long
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );

    default:
      return (
        <Simple
          question={question}
          handleClick={handleClick}
          key={question.position}
        />
      );
  }
};
