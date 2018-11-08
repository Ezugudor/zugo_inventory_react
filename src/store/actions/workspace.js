import { SAVE_WORKSPACES, DELETE_WORKSPACE, UPDATE_WORKSPACES } from "./types";
import { SwypPartnerApi } from "../../core/api";
import {
  setNotificationMessage,
  startNetworkRequest,
  stopNetworkRequest
} from "./app";

const updateWorkspaces = workspace => ({ type: UPDATE_WORKSPACES, workspace });

const removeWorkspace = id => ({ type: DELETE_WORKSPACE, id });
const saveWorkspaces = collection => ({
  type: SAVE_WORKSPACES,
  collection
});

export const fetchWorkspaces = businessId => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`workspaces/businesses/${businessId}`)
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

export const createWorkspace = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("workspaces", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateWorkspaces(res.data));
        dispatch(
          setNotificationMessage(
            `${res.data.name} workspace was created successfully`,
            "success"
          )
        );
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

export const deleteWorkspace = id => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`workspaces/${id}`)
      .then(() => {
        dispatch(stopNetworkRequest());
        // check if delete was successful before remove item
        dispatch(removeWorkspace(id));
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
