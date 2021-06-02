import {
  Email,
  User,
  Phone,
  Address,
  Signature,
  IDCard,
  DropdownSVG
} from "./fontIcons";
import { Date, People, Card, List, Gender, Number } from "./fontIcons";
import { MultiChoice, YesorNo, Dropdown, Calender } from "./fontIcons";
import { Picture, Video, House, Statement } from "./fontIcons";
import { Section, Introduction, Telephone, Country } from "./fontIcons";
import { State, LGA, OfficeDocument, Passport } from "./fontIcons";
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
    case "bvn":
      return <Number style={`${iconStyle}`} />;
    case "multichoice":
      return <MultiChoice style={`${iconStyle}`} />;
    case "yesorno":
      return <YesorNo style={`${iconStyle}`} />;
    case "dropdown":
      return <Dropdown style={`${iconStyle}`} />;
    // return <DropdownSVG style={`${iconStyle}`} />;
    case "dob":
    case "date":
      return <Calender style={`${iconStyle}`} />;
    case "picture":
      return <Picture style={`${iconStyle}`} />;
    case "passport":
      return <Passport style={`${iconStyle}`} />;
    case "video":
      return <Video style={`${iconStyle}`} />;
    case "signature":
      return <Signature style={`${iconStyle}`} />;
    case "branch":
      return <House style={`${iconStyle}`} />;
    case "creditcards":
      return <Card style={`${iconStyle}`} />;
    case "statement":
      return <Statement style={`${iconStyle}`} />;
    case "section":
      return <Section style={`${iconStyle}`} />;
    case "introduction":
      return <Introduction style={`${iconStyle}`} />;
    case "phone":
    case "mobile":
      return <Phone style={`${iconStyle}`} />;
    case "tel":
      return <Telephone style={`${iconStyle}`} />;
    case "country":
      return <Country style={`${iconStyle}`} />;
    case "state":
      return <State style={`${iconStyle}`} />;
    case "lga":
      return <LGA style={`${iconStyle}`} />;
    case "idcard":
      return <IDCard style={`${iconStyle}`} />;
    case "document":
      return <OfficeDocument style={`${iconStyle}`} />;
  }
};
