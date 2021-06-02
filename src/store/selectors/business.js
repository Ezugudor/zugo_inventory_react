import { createSelector } from "reselect";

const business = state => state.business;

export const getOutlets = createSelector(
  business,
  biz => biz.outlets
);
export const getCreditPayment = createSelector(
  business,
  biz => biz.business_credit_payments
);
export const getCustomerCredit = createSelector(
  business,
  biz => biz.business_customer_credits
);
export const getCustomers = createSelector(
  business,
  biz => biz.business_customers
);
export const getDrivers = createSelector(
  business,
  biz => biz.business_drivers
);
export const getStocks = createSelector(
  business,
  biz => biz.business_stocks
);
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
