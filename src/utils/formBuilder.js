import { Value } from "slate";
import uuid4 from "uuid4";
export const ditorDefaultValue = () =>
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

const generateDefaultVaidationRule = type => [];

export const generateNewElement = (type, position) => {
  const rules = generateDefaultVaidationRule(type);
  const id = uuid4();
  let children = [];
  return {
    formElement: {
      validationRule: rules,
      position,
      name: "",
      children,
      type,
      id
    }
  };
};

export const blockTypes = [
  { name: "Introduction Section", type: "introduction" },
  // { name: "Multiple Choice", type: "multichoice" },
  { name: "Passport Photo", type: "picture" },
  // { name: "Account Number", type: "account" },
  { name: "Section Title", type: "section" },
  { name: "Short Text", type: "shorttext" },
  { name: "Mobile Number", type: "mobile" },
  { name: "Firstnane", type: "firstname" },
  // { name: "Drop Down", type: "dropdown" },
  { name: "Long Text", type: "longtext" },
  { name: "lastnane", type: "lastname" },
  { name: "Date Of Birth", type: "dob" },
  { name: "Cards", type: "creditcards" },
  { name: "Office Number", type: "tel" },
  { name: "Address", type: "address" },
  { name: "Countries", type: "country" },
  { name: "Signature", type: "sign" },
  { name: "Yes/No", type: "yesorno" },
  // { name: "Number", type: "number" },
  { name: "States", type: "state" },
  { name: "Email", type: "email" },
  { name: "Date", type: "date" },
  { name: "BVN", type: "bvn" }
];
