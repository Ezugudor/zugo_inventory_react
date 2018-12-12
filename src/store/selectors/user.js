import { createSelector } from "reselect";

const business = state => state.user.business;
export const getBusinessId = createSelector(business, biz => biz.id);
