import { ValidationRuleBuilder } from "../core";
import { Value } from "slate";
import uuid4 from "uuid4";
// import { BranchView } from "../../Components/Branch";
import { countryStates } from "./";

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
 * @param {number} position the position where the question would be put on the form
 */
export const generateNewQuestion = (type, position, branches) => {
  const rules = buildValidationRule(type);
  const id = uuid4();
  console.log("validation rules for a single form element", rules);
  let children = branchFill(type, branches);

  children =
    type == "state"
      ? getStates()
      : type == "branch"
      ? branchFill(type, branches)
      : [];

  return {
    validationRules: rules,
    description: "",
    position,
    name: "",
    children: [],
    type,
    id
  };
};

/**
 * generate new child question to add to a new form element children
 * @param {string} type type of question to be asked
 * @param {number} position the position where the question would be put on the form
 * @param {string} branch incase if there is need to  use the branch (will be removed soon)
 * @param {object} info information about the new element to be added
 */
export const generateNewChildQuestion = (
  type,
  position,
  branches,
  info,
  compactType
) => {
  const rules = buildValidationRule(compactType);
  const id = uuid4();
  let children = branchFill(compactType, branches);
  console.log("log compactType", compactType);
  children =
    compactType == "address"
      ? getStates()
      : compactType == "branch"
      ? branchFill(compactType, branches)
      : [];
  console.log("log type", type);
  console.log("log info", info);
  console.log("log children", children);
  console.log("log ggget states", getStates());
  console.log("log ggget Branches", branchFill(compactType, branches));
  return {
    validationRules: rules,
    description: info.description,
    position,
    qPosition: position,
    isCompact: true,
    group: `${type}_${position}`,
    compactRequired: false,
    name: info.name,
    children,
    type,
    id
  };
};

export const generateRequiredChildren = (type, parentIndex) => {
  // const rules = buildValidationRule(type);
  // const id = uuid4();
  // type here is compactType
  let children = [];

  const branchRequirement = [
    {
      name: "State",
      desc: "Which state is the branch located?",
      type: "dropdown",
      controlType: "state",
      position: 1,
      group: `branch_${parentIndex}`
    }
  ];
  const addressRequirement = [
    {
      name: "House Number",
      desc: "Your house number",
      type: "shorttext",
      position: 1,
      group: `address_${parentIndex}`
    },
    {
      name: "Street Name",
      desc: "Your street name",
      type: "longtext",
      position: 2,
      group: `address_${parentIndex}`
    },
    {
      name: "State",
      desc: "Which state is your address?",
      type: "dropdown",
      controlType: "state",
      position: 3,
      group: `address_${parentIndex}`
    },
    {
      name: "Area / LGA",
      desc: "Address Area / LGA",
      type: "dropdown",
      controlType: "lga",
      position: 4,
      group: `address_${parentIndex}`
    }
  ];

  if (type == "address") {
    let addressChildren = [];

    addressRequirement.forEach(elem => {
      const id = uuid4();
      const rules = buildValidationRule(elem.type);

      addressChildren.push({
        validationRules: rules,
        description: elem.desc,
        position: elem.position,
        qPosition: elem.position,
        name: elem.name,
        children,
        isCompact: true,
        compactRequired: true,
        type: elem.type,
        id
      });
    });
    return addressChildren;
  } else if (type == "branch") {
    let branchChildren = [];
    branchRequirement.forEach(elem => {
      const id = uuid4();
      const rules = buildValidationRule(elem.type);

      branchChildren.push({
        validationRules: rules,
        description: elem.desc,
        position: elem.position,
        qPosition: elem.position,
        name: elem.name,
        children,
        isCompact: true,
        compactRequired: true,
        type: elem.type,
        id
      });
    });
    return branchChildren;
  }
};

/**
 * Populates the element if its a "Branch"
 * @param {string} Branches The global branches contained in the React Component's props.
 * Returns empty array otherwise(for all other form elements)
 */
//Ezugudor addendum
export const branchFill = (type, branches) => {
  if (type == "branch") {
    return branches;
  } else {
    return [];
  }
};

export const getStates = () => {
  return countryStates.map(state => ({
    stateName: state.state.name,
    stateID: state.state.id
  }));
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
    name: "What branch do you want us to send your response to?",
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
 * Reset all position, reassign indexes on element remove
 * @param {array} questions questions that are already part of the form
 */
export const resetPosition = questions => {
  return questions
    .filter(element => element.type !== "introduction")
    .map((question, index) => {
      question.position = index + 1;
      return question;
    });
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
 * Extract out form element that need users interaction
 * @param {array} formInputs form elements
 */
export const getQuestions = formInputs => {
  return formInputs
    .filter(
      element => element.type !== "section" && element.type !== "introduction"
    )
    .map((question, index) => {
      question.qPosition = index + 1;
      return question;
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
  { name: "First Name", type: "firstname" },
  { name: "Last Name", type: "lastname" },
  { name: "Email", type: "email" },

  { name: "Cards", type: "creditcards" },
  { name: "Yes/No", type: "yesorno" },
  { name: "Gender", type: "gender" },
  { name: "Multiple Choice", type: "multichoice" },
  { name: "Drop Down", type: "dropdown" },

  { name: "Address", type: "address" },
  { name: "Countries", type: "country" },
  { name: "Branch", type: "branch" },
  { name: "States", type: "state" },
  { name: "Area", type: "lga" },
  { name: "Landmark/Direction", type: "longtext" },

  { name: "Signature", type: "signature" },
  { name: "Passport Photo", type: "passport" },

  { name: "Ask For Picture", type: "picture" },
  { name: "Ask For Video", type: "video" },

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
