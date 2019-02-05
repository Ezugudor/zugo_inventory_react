import { createSelector } from "reselect";

const user = state => state.user;
const business = state => state.user.business;

export const getBusinessId = createSelector(business, biz => biz.id);
export const getBranches = createSelector(business, biz => biz.branches);
export const getAccounts = createSelector(business, biz => biz.accounts);
export const getBusinessSlug = createSelector(business, biz => biz.slug);
export const getCurrentUser = createSelector(user, data => data.currentUser);
