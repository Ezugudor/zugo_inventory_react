import {
  NOTIFICATION_MESSAGE,
  NOTIFICATION_MESSAGE_AUTO_SAVE,
  START_NETWORK_REQUEST,
  START_AUTO_SAVE_NETWORK_REQUEST,
  STOP_NETWORK_REQUEST,
  STOP_AUTO_SAVE_NETWORK_REQUEST,
  END_NOTIFICATION,
  END_CARD_NOTIFICATION,
  START_PROGRESS_INDICATOR,
  END_PROGRESS_INDICATOR,
  NETWORK_ERROR,
  PREVIEW_IMAGE,
  END_PREVIEW_IMAGE
} from "./types";

export const startNetworkRequest = () => ({ type: START_NETWORK_REQUEST });
export const startAutoSaveNetworkRequest = () => ({
  type: START_AUTO_SAVE_NETWORK_REQUEST
});
export const stopNetworkRequest = () => ({ type: STOP_NETWORK_REQUEST });
export const stopAutoSaveNetworkRequest = () => ({
  type: STOP_AUTO_SAVE_NETWORK_REQUEST
});
export const networkError = error => ({ type: NETWORK_ERROR, error });
export const endNotification = () => ({ type: END_NOTIFICATION });
export const endCardNotification = () => ({ type: END_CARD_NOTIFICATION });
export const startProgressIndicator = () => ({
  type: START_PROGRESS_INDICATOR
});
export const endProgressIndicator = () => ({ type: END_PROGRESS_INDICATOR });
export const setNotificationMessage = (
  message,
  type,
  title,
  timeOut = 2000
) => ({
  type: NOTIFICATION_MESSAGE,
  nType: type,
  message,
  timeOut,
  title
});
export const setAutoSaveNotificationMessage = (
  message,
  type,
  title,
  timeOut = 2000
) => ({
  type: NOTIFICATION_MESSAGE_AUTO_SAVE,
  nType: type,
  message,
  timeOut,
  title
});
export const endPreviewImage = () => ({ type: END_PREVIEW_IMAGE });
export const previewImage = ({ name, imageURL }) => ({
  type: PREVIEW_IMAGE,
  title: name,
  url: imageURL
});
