import { createSelector } from "reselect";

const user = state => state.user;
export const getCurrentUser = createSelector(
  user,
  data => data.currentUser
);
