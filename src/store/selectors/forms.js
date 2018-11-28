import { createSelector } from "reselect";

const getForm = state => state.form;

export const getAllForms = createSelector(getForm, form => form.all);
export const getNewForm = createSelector(getForm, form => form.newForm);
