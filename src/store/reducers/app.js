import { updateState } from "../../utils";
import {
  NOTIFICATION_MESSAGE,
  START_NETWORK_REQUEST,
  STOP_NETWORK_REQUEST,
  END_NOTIFICATION,
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
  errorDetails: null,
  loading: false,
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

    case END_NOTIFICATION:
      return updateState(state, { showNotification: false });

    case STOP_NETWORK_REQUEST:
      return updateState(state, { loading: false });

    default:
      return state;
  }
};
