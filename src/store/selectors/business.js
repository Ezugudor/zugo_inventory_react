import { createSelector } from "reselect";

const business = state => state.business;
const progress = state => state.app;

export const getBusinessId = createSelector(
  business,
  biz => biz.id
);
export const getBranches = createSelector(
  business,
  biz => biz.branches
);
export const getAccounts = createSelector(
  business,
  biz => biz.accounts
);
export const getBusinessSlug = createSelector(
  business,
  biz => biz.slug
);
export const getBusinessLogo = createSelector(
  business,
  biz => biz.logoUrl
);
export const getBusinessColor = createSelector(
  business,
  biz => biz.color
);
export const getProgressIndicator = createSelector(
  progress,
  app => app.loading
);
