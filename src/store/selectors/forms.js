import { createSelector } from "reselect";

const getForm = state => state.form;

export const getNewForm = createSelector(
  getForm,
  form => form.newForm
);
export const getAllForms = createSelector(
  getForm,
  form => {
    console.log("from crate selector", form);
    return form.all;
  }
);
export const getBuilderState = createSelector(
  getForm,
  form => form.formBuilderState
);
