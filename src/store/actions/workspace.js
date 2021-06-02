import { SwypPartnerApi } from "../../core/api";
import { SAVE_WORKSPACES } from "./types";

import {
  setNotificationMessage,
  startNetworkRequest,
  stopNetworkRequest
} from "./app";

const saveWorkspaces = collection => ({
  type: SAVE_WORKSPACES,
  collection
});

export const fetchWorkspaces = businessId => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`workspaces`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(saveWorkspaces(res.data));
      })
      .catch(err => {
        dispatch(stopNetworkRequest());
        if (err.response) {
          const error = err.response.data;
          dispatch(setNotificationMessage(error.details, "error"));
        }
        dispatch(setNotificationMessage("Bad Network", "error"));
      });
  };
};
