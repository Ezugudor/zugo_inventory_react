import { updateState } from "../../utils";
import {
  NOTIFICATION_MESSAGE,
  NOTIFICATION_MESSAGE_AUTO_SAVE,
  START_NETWORK_REQUEST,
  START_AUTO_SAVE_NETWORK_REQUEST,
  STOP_NETWORK_REQUEST,
  STOP_AUTO_SAVE_NETWORK_REQUEST,
  END_NOTIFICATION,
  END_CARD_NOTIFICATION,
  NETWORK_ERROR,
  PREVIEW_IMAGE,
  END_PREVIEW_IMAGE
} from "../actions";

const initialState = {
  notificationTitle: "",
  notificationMessage: "",
  showNotification: false,
  notificationType: "",
  notificationTimeout: 0,
  cardNotificationTitle: "Saved",
  cardNotificationMessage: "Form successfully saved",
  cardNotificationType: "",
  showCardNotification: true,
  cardNotificationTimeout: 0,
  errorDetails: null,
  loading: false,
  autoSaving: false,
  error: false,
  previewImage: {
    show: false,
    url: "",
    title: ""
  }
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

    case NOTIFICATION_MESSAGE_AUTO_SAVE:
      return updateState(state, {
        cardNotificationTitle: action.title,
        cardNotificationMessage: action.message,
        cardNotificationType: action.nType,
        cardNotificationTimeout: action.timeOut,
        showCardNotification: true
      });

    case PREVIEW_IMAGE:
      const { previewImage } = state;
      previewImage.title = action.title;
      previewImage.url = action.url;
      previewImage.show = true;
      return updateState(state, {
        previewImage
      });

    case END_PREVIEW_IMAGE:
      const { previewImage: previewImage2 } = state;
      previewImage2.show = false;
      return updateState(state, {
        previewImage: previewImage2
      });

    case START_NETWORK_REQUEST:
      return updateState(state, { loading: true });

    case START_AUTO_SAVE_NETWORK_REQUEST:
      return updateState(state, { autoSaving: true });

    case END_NOTIFICATION:
      return updateState(state, { showNotification: false });

    case END_CARD_NOTIFICATION:
      return updateState(state, { showCardNotification: false });

    case STOP_NETWORK_REQUEST:
      return updateState(state, { loading: false });

    case STOP_AUTO_SAVE_NETWORK_REQUEST:
      return updateState(state, { autoSaving: false });

    default:
      return state;
  }
};
