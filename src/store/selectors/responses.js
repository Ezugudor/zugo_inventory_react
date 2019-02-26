import { createSelector } from "reselect";

const responses = state => state.responses;
const getProps = (state, props) => props;

export const getProcessedResponses = createSelector(responses, resps => {
  return resps.processed;
});

export const getRevisedResponses = createSelector(responses, resps => {
  return resps.revisions;
});

export const getUnreadResponses = createSelector(responses, resps => {
  return resps.pending;
});

export const getPartiallyProcessedResponses = createSelector(
  responses,
  resps => {
    return resps.partiallyProcessed;
  }
);

export const getResponse = createSelector(
  [responses, getProps],
  (resps, props) => {
    return resps[props.type].result.find(resp => resp.id === props.id);
  }
);
