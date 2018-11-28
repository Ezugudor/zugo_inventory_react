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

export const generateNewElement = (type, position) => {
  if (type === "introduction") position = 0;
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

const generateDefaultVaidationRule = type => [];

export const blockTypes = [
  { name: "Introduction Section", type: "introduction" },
  // { name: "Multiple Choice", type: "multichoice" },
  // { name: "Passport Photo", type: "picture" },
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
  // { name: "Signature", type: "sign" },
  // { name: "Number", type: "number" },
  { name: "Email", type: "email" },
  { name: "Date", type: "date" },
  { name: "BVN", type: "bvn" }
];
