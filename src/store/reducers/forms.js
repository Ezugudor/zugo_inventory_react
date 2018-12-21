import { updateState } from "../../utils";
import {
  UNPRESERVE_FORMBUILDER_STATE,
  PRESERVE_FORMBUILDER_STATE,
  UNPRESERVE_NEW_FORM,
  PRESERVE_NEW_FORM,
  START_NEW_FORM,
  UPDATE_FORMS,
  SAVE_FORMS
} from "../actions";

const initialState = {
  all: {},
  synched: [],
  unsynched: [],
  formBuilderState: {
    showSettingsWindow: true,
    settingsWindowName: "",
    currentElementType: "",
    currentElementId: ""
  },
  newForm: {
    formType: { id: "", parent: "", name: "" },
    elements: [],
    name: ""
  }
};

export const form = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORMS:
      let all = { ...state.all };
      if (all[action.id]) {
        all[action.id].push(action.form);
      } else {
        all[action.id] = [action.form];
      }
      return updateState(state, { all });

    case UNPRESERVE_NEW_FORM:
      return updateState(state, { newForm: initialState.newForm });

    case UNPRESERVE_FORMBUILDER_STATE:
      return updateState(state, {
        formBuilderState: initialState.formBuilderState
      });

    case PRESERVE_FORMBUILDER_STATE:
      return updateState(state, { formBuilderState: action.newState });

    case SAVE_FORMS:
      all = { ...state.all };
      all[action.id] = action.collection;
      return updateState(state, { all });

    case PRESERVE_NEW_FORM:
      const newForm = { ...state.newForm };
      newForm.elements = action.elements;
      return updateState(state, { newForm: newForm });

    case START_NEW_FORM:
      const form = { ...state.newForm };
      form.formType = action.data.formType;
      form.name = action.data.name;
      return updateState(state, { newForm: form });

    default:
      return state;
  }
};
