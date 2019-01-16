import { ValidationRuleBuilder } from "../core";
import { Value } from "slate";
import uuid4 from "uuid4";

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

export const getDefaultElement = () => ({
  validationRules: [],
  type: "default",
  children: [],
  position: 1,
  id: uuid4(),
  name: ""
});

export const generateNewElement = (type, position) => {
  const rules = buildValidationRule(type);
  const id = uuid4();
  let children = [];
  return {
    formElement: {
      validationRules: rules,
      position,
      name: "",
      children,
      type,
      id
    }
  };
};

export const getNextPosition = questions => {
  const len = questions.filter(element => element.type !== "introduction")
    .length;
  return len === 0 ? 1 : len + 1;
};

export const getIntroIndex = questions => {
  return questions.findIndex(question => question.type === "introduction");
};

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

export const blockTypes = [
  { name: "Official Use Section", type: "official-section" },
  { name: "Introduction Section", type: "introduction" },
  // { name: "Multiple Choice", type: "multichoice" },
  { name: "Passport Photo", type: "picture" },
  // { name: "Account Number", type: "account" },
  { name: "Section Title", type: "section" },
  { name: "Short Text", type: "shorttext" },
  { name: "Mobile Number", type: "mobile" },
  { name: "Office Number", type: "tel" },
  { name: "Firstnane", type: "firstname" },
  { name: "lastnane", type: "lastname" },
  // { name: "Drop Down", type: "dropdown" },
  { name: "Long Text", type: "longtext" },
  { name: "Date Of Birth", type: "dob" },
  { name: "Cards", type: "creditcards" },
  { name: "Yes/No", type: "yesorno" },
  { name: "Address", type: "address" },
  // { name: "Countries", type: "country" },
  // { name: "States", type: "state" },
  { name: "Signature", type: "sign" },
  // { name: "Number", type: "number" },
  { name: "Email", type: "email" },
  { name: "Date", type: "date" },
  { name: "BVN", type: "bvn" }
];
