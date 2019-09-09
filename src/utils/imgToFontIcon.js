import { Email, User, Phone, Address, Signature } from "./fontIcons";
import { Date, People, Card, List, Gender, Number } from "./fontIcons";
import { MultiChoice, YesorNo, Dropdown, Calender } from "./fontIcons";
import { Picture, Video, House } from "./fontIcons";
import React from "react";
/**
 * Checks the image name and use the value to get a font
 * icon equivalent.
 * @param {string} iconType
 * @param {string} iconStyle
 */
export const imgToFontIcon = (iconType, iconStyle) => {
  switch (iconType) {
    case "lastname":
    case "firstname":
    case "shorttext":
    case "longtext":
      return <List style={`${iconStyle}`} />;
    case "email":
      return <Email style={`${iconStyle}`} />;
    case "gender":
      return <Gender style={`${iconStyle}`} />;
    case "address":
      return <Address style={`${iconStyle}`} />;
    case "number":
    case "account":
    case "mobile":
    case "bvn":
      return <Number style={`${iconStyle}`} />;
    case "multichoice":
      return <MultiChoice style={`${iconStyle}`} />;
    case "yesorno":
      return <YesorNo style={`${iconStyle}`} />;
    case "dropdown":
      return <Dropdown style={`${iconStyle}`} />;
    case "dob":
      return <Calender style={`${iconStyle}`} />;
    case "picture":
    case "passport":
      return <Picture style={`${iconStyle}`} />;
    case "video":
      return <Video style={`${iconStyle}`} />;
    case "signature":
      return <Signature style={`${iconStyle}`} />;
    case "branch":
      return <House style={`${iconStyle}`} />;
    case "creditcards":
      return <Card style={`${iconStyle}`} />;
  }
};
