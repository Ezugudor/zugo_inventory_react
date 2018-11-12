import { Value } from "slate";
import uuid4 from "uuid4";

export const InitialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph"
      }
    ]
  }
});

export const defaultEditor = () => ({
  validationRules: [],
  type: "default",
  children: [],
  position: 1,
  id: uuid4(),
  name: ""
});
