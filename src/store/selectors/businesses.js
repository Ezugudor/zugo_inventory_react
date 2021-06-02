import { createSelector } from "reselect";

const businesses = state => state.businesses;
const getProps = (state, props) => props;

export const getBusinessById = createSelector(
  [businesses, getProps],
  (resps, id) => {
    return resps.allBusinesses.result.find(biz => biz.id == id);
  }
);

export const getAllBusinesses = createSelector(
  businesses,
  resps => {
    return resps.allBusinesses;
  }
);

export const getApprovedBusinesses = createSelector(
  businesses,
  resps => {
    return resps.approvedBusinesses;
  }
);

export const getInactiveBusinesses = createSelector(
  businesses,
  resps => {
    return resps.inactiveBusinesses;
  }
);

export const getRevisedResponses = createSelector(
  businesses,
  resps => {
    return resps.revisions;
  }
);

export const getResponse = createSelector(
  [businesses, getProps],
  (resps, props) => {
    return resps[props.type].result.find(resp => resp.id === props.id);
  }
);
