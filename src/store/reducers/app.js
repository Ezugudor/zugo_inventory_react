import { updateState } from "../../utils";
import {
  NOTIFICATION_MESSAGE,
  START_NETWORK_REQUEST,
  STOP_NETWORK_REQUEST,
  END_NOTIFICATION,
  NETWORK_ERROR
} from "../actions";

const initialState = {
  notificationTitle: "",
  notificationMessage: "",
  showNotification: false,
  notificationType: "",
  notificationTimeout: 0,
  errorDetails: null,
  loading: false,
  error: false
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return updateState(state, { errorMessage: action.error });

    case NOTIFICATION_MESSAGE:
      return updateState(state, {
        notificationTitle: action.title,
        notificationMessage: action.message,
        notificationType: action.nType,
        notificationTimeout: action.timeOut,
        showNotification: true
      });

    case START_NETWORK_REQUEST:
      return updateState(state, { loading: true });

    case END_NOTIFICATION:
      return updateState(state, { showNotification: false });

    case STOP_NETWORK_REQUEST:
      return updateState(state, { loading: false });

    default:
      return state;
  }
};
