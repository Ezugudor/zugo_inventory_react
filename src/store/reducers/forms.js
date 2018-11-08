import { updateState } from "../../utils";
import {
  UNPRESERVE_FOR_PREVIEW,
  PRESERVE_FOR_PREVIEW,
  START_NEW_FORM,
  UPDATE_FORMS,
  SAVE_FORMS
} from "../actions";

const initialState = {
  all: [],
  newForm: {
    elements: [],
    workspace: "",
    name: ""
  }
};

export const form = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORMS:
      return updateState(state, { all: state.all.concat(action.form) });

    case UNPRESERVE_FOR_PREVIEW:
      return updateState(state, { newForm: initialState.newForm });

    case SAVE_FORMS:
      return updateState(state, { all: action.collection });

    case PRESERVE_FOR_PREVIEW:
      const newForm = { ...state.newForm };
      newForm.elements = action.elements;
      return updateState(state, { newForm: newForm });

    case START_NEW_FORM:
      const form = { ...state.newForm };
      form.workspace = action.data.workspace;
      form.name = action.data.name;
      return updateState(state, { newForm: form });

    default:
      return state;
  }
};
