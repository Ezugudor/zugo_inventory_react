import {
  NOTIFICATION_MESSAGE,
  START_NETWORK_REQUEST,
  STOP_NETWORK_REQUEST,
  END_NOTIFICATION,
  NETWORK_ERROR
} from "./types";

export const startNetworkRequest = () => ({ type: START_NETWORK_REQUEST });
export const stopNetworkRequest = () => ({ type: STOP_NETWORK_REQUEST });
export const networkError = error => ({ type: NETWORK_ERROR, error });
export const endNotification = () => ({ type: END_NOTIFICATION });
export const setNotificationMessage = (message, type) => ({
  type: NOTIFICATION_MESSAGE,
  nType: type,
  message
});
