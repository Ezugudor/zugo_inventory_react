import { createSelector } from "reselect";

const file = state => state.uploadedFile;

export const getUploadedFileData = createSelector(
  file,
  f => f.data
);
export const getUploadStatus = createSelector(
  file,
  f => f.uploadStatus
);
