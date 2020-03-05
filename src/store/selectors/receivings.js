import { createSelector } from "reselect";

const getRece = state => state.business;
const rece = state => state.receivings;

export const getReceivings = createSelector(
  getRece,
  rece => rece.business_receivings_sum
);
export const getCurrentCode = createSelector(
  rece,
  cc => cc.currentCode
);
export const getCurrentCodeSupplies = createSelector(
  rece,
  cc => cc.supplies
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
