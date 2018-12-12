import { createSelector } from "reselect";

const responses = state => state.responses;

export const getProcessedResponses = createSelector(responses, resps => {
  return resps.processed;
});

export const getRevisedResponses = createSelector(responses, resps => {
  return resps.revisions;
});

export const getUnreadResponses = createSelector(responses, resps => {
  return resps.unread;
});
