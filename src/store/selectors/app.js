import { createSelector } from "reselect";

const app = state => state.app;

export const getProgressIndicator = createSelector(
  app,
  app => app.loading
);

export const getImagePreviewStatus = createSelector(
  app,
  app => app.previewImage.show
);

export const getImagePreviewTitle = createSelector(
  app,
  app => {
    return app.previewImage.title;
  }
);

export const getImagePreviewUrl = createSelector(
  app,
  app => app.previewImage.url
);
