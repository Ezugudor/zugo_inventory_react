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
export const generateNewQuestion = (type, position) => {
  const rules = buildValidationRule(type);
  const id = uuid4();
  let children = [];
  return {
    validationRules: rules,
    description: "",
    position,
    name: "",
    children,
    type,
    id
  };
};

/**
 * Ask user which of the bank branch they want their form sent for processing
 * @param {string} position position question would occupy in the list of questions
 * for the form been created
 */
export const generateBankLocationQuestion = (position, branches) => {
  const type = "branch";
  const rules = buildValidationRule(type);
  const id = uuid4();
  return {
    name: "What branch do you want us to send your response to",
    validationRules: rules,
    children: branches,
    description: "",
    position,
    type,
    id
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
 * transform array of text to arry of option object
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
 * Find out if a question has been asked already
 * @param {Array} questions array of question a user is building
 * @param {string} questionName the name of the question a user want,
 * it know it it has been asked
 */
export const hasQuestion = (questions, questionName) => {
  const index = questions.findIndex(question => question.name === questionName);
  return index !== -1;
};

export const getFirstSection = formQuestions => {
  return formQuestions.find(question => question.type === "section");
};

export const getNextSection = (formQuestions, currentQuestionId) => {
  const currentQuestionIndex = formQuestions.findIndex(
    question => question.id === currentQuestionId
  );
  const nextQuestion = formQuestions[currentQuestionIndex + 1];
  return (nextQuestion && nextQuestion.type) === "section"
    ? nextQuestion
    : null;
};

/**
 * Type of questions that can be part of a form
 * Changing values here may have ripple effect across the system
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

  { name: "Signature", type: "signature" },
  { name: "Passport Photo", type: "passport" },

  { name: "Account Number", type: "account" },
  { name: "Mobile Number", type: "mobile" },
  { name: "Office Number", type: "tel" },
  { name: "Number", type: "number" },
  { name: "BVN", type: "bvn" },

  { name: "Date Of Birth", type: "dob" },
  { name: "Date", type: "date" }
];

/**
 * Get initial validation rules for a question
 * @param {string} questionType type of question been asked
 */
const buildValidationRule = questionType => {
  switch (questionType) {
    case "account":
      return ValidationRuleBuilder.buildAccountNumberRule();
    case "mobile":
      return ValidationRuleBuilder.buildMobileNumberRule();
    case "email":
      return ValidationRuleBuilder.buildEmailRule();
    case "tel":
      return ValidationRuleBuilder.buildOfficePhoneRule();
    case "bvn":
      return ValidationRuleBuilder.buildBvnNumberRule();
    default:
      return ValidationRuleBuilder.buildDefaultRule();
  }
};
