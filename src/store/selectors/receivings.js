import { createSelector } from "reselect";

const getRece = state => state.business;

export const getReceivings = createSelector(
  getRece,
  rece => rece.business_receivings_sum
);
// export const getAllForms = createSelector(
//   getForm,
//   form => {
//     return form.all;
//   }
// );
// export const getBuilderState = createSelector(
//   getForm,
//   form => form.formBuilderState
// );
