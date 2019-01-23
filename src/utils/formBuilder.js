import { ValidationRuleBuilder } from "../core";
import { Value } from "slate";
import uuid4 from "uuid4";

/**
 * used to for building label for question with options
 */
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * value for a slate editor
 */
export const editorDefaultValue = () =>
  Value.fromJSON({
    document: {
      nodes: [
        {
          object: "block",
          type: "paragraph"
        }
      ]
    }
  });

/**
 * generate new question to add to a new form
 * @param {string} type type of question to be asked
 * @param {number} position the position where the question woulb be put on the form
 */
export const generateNewElement = (type, position) => {
  const rules = buildValidationRule(type);
  const id = uuid4();
  let children = [];
  return {
    formElement: {
      validationRules: rules,
      description: "",
      position,
      name: "",
      children,
      type,
      id
    }
  };
};

/**
 * get the position of next question in the form
 * @param {array} questions questions that are already part of the form
 */
export const getNextPosition = questions => {
  const len = questions.filter(element => element.type !== "introduction")
    .length;
  return len === 0 ? 1 : len + 1;
};

/**
 * find the position of a form introduction section
 * @param {array} questions questions that are already part of the form
 */
export const getIntroIndex = questions => {
  return questions.findIndex(question => question.type === "introduction");
};

/**
 * transfer array of text to arry of option object
 * @param {array} array array with text to be transformed into option object
 * @param {string} filterText value by which array element would be filted
 */
export const buildOptionFromArray = (array, filterText = null) => {
  if (filterText) {
    array = array.filter(item => item.indexOf(filterText) !== -1);
  }

  return array.map((el, index) => {
    return { label: alphabet[index], text: el, index: index, picked: false };
  });
};

/**
 * Type of questions that can be part of a form
 */
export const blockTypes = [
  { name: "Introduction Section", type: "introduction" },
  { name: "Section Title", type: "section" },
  { name: "Statement", type: "statement" },

  { name: "Short Text", type: "shorttext" },
  { name: "Long Text", type: "longtext" },
  { name: "Firstnane", type: "firstname" },
  { name: "lastnane", type: "lastname" },
  { name: "Email", type: "email" },

  { name: "Cards", type: "creditcards" },
  { name: "Yes/No", type: "yesorno" },
  { name: "Gender", type: "gender" },
  { name: "Multiple Choice", type: "multichoice" },
  { name: "Drop Down", type: "dropdown" },

  { name: "Address", type: "address" },
  // { name: "Countries", type: "country" },
  // { name: "States", type: "state" },

  { name: "Signature", type: "sign" },
  { name: "Passport Photo", type: "picture" },

  { name: "Account Number", type: "account" },
  { name: "Mobile Number", type: "mobile" },
  { name: "Office Number", type: "tel" },
  { name: "Number", type: "number" },
  { name: "BVN", type: "bvn" },

  { name: "Date Of Birth", type: "dob" },
  { name: "Date", type: "date" }
];

const buildValidationRule = elementType => {
  switch (elementType) {
    case "account":
      return ValidationRuleBuilder.buildAccountNumberRule();
    case "mobile":
      return ValidationRuleBuilder.buildMobileNumberRule();
    case "tel":
      return ValidationRuleBuilder.buildOfficePhoneRule();
    case "bvn":
      return ValidationRuleBuilder.buildBvnNumberRule();
    default:
      return ValidationRuleBuilder.buildDefaultRule();
  }
};
