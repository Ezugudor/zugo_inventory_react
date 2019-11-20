import {
  NOTIFICATION_MESSAGE,
  START_NETWORK_REQUEST,
  STOP_NETWORK_REQUEST,
  END_NOTIFICATION,
  START_PROGRESS_INDICATOR,
  END_PROGRESS_INDICATOR,
  NETWORK_ERROR
} from "./types";

export const startNetworkRequest = () => ({ type: START_NETWORK_REQUEST });
export const stopNetworkRequest = () => ({ type: STOP_NETWORK_REQUEST });
export const networkError = error => ({ type: NETWORK_ERROR, error });
export const endNotification = () => ({ type: END_NOTIFICATION });
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
