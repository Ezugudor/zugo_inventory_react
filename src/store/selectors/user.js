import { createSelector } from "reselect";

const business = state => state.user.business;

export const getBusinessId = createSelector(business, biz => biz.id);
export const getAccounts = state => state.user.business.accounts;
export const getBranches = state => state.user.business.branches;
export const getCurrentUser = state => state.user.currentUser;
