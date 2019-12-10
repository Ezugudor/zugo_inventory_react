import { updateState } from "../../utils";
import {
  UNPRESERVE_FORMBUILDER_STATE,
  PRESERVE_FORMBUILDER_STATE,
  UNPRESERVE_NEW_FORM,
  PRESERVE_NEW_FORM,
  START_NEW_FORM,
  UPDATE_FORMS,
  EDIT_FORM,
  SAVE_FORMS,
  TOGGLE_PUBLISHED
} from "../actions";

const initialState = {
  all: {},
  synched: [],
  unsynched: [],
  formBuilderState: {
    showSettingsWindow: true,
    settingsWindowName: "",
    currentElement: {}
  },
  newForm: {
    formType: { id: "", parent: "", name: "" },
    elements: [],
    name: "",
    isLive: false
  },
  editForm: {
    formType: { id: "", parent: "", name: "" },
    elements: [],
    name: "",
    isLive: false
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
      form.elements = action.data.elements;
      form.formId = action.data.formId;
      form.isLive = action.data.isLive;
      return updateState(state, { newForm: form });

    case TOGGLE_PUBLISHED:
      const formm = { ...state.newForm };
      formm.isLive = !formm.isLive;
      return updateState(state, { newForm: formm });

    case EDIT_FORM:
      const eForm = { ...state.newForm };
      eForm.formType = action.data.formType;
      eForm.name = action.data.name;
      eForm.elements = action.data.elements;
      eForm.formId = action.data.formId;
      eForm.mode = "update";
      return updateState(state, { newForm: eForm });

    default:
      return state;
  }
};
