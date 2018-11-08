import { SwypPartnerApi } from "../../core/api";
import {
  UNPRESERVE_FOR_PREVIEW,
  PRESERVE_FOR_PREVIEW,
  START_NEW_FORM,
  UPDATE_FORMS,
  SAVE_FORMS
} from "./types";
import {
  setNotificationMessage,
  startNetworkRequest,
  stopNetworkRequest
} from "./app";

const saveForms = collection => ({ type: SAVE_FORMS, collection });
const updateForms = form => ({ type: UPDATE_FORMS, form });
const unpreserveFormForPreview = () => ({
  type: UNPRESERVE_FOR_PREVIEW
});

export const preserveFormForPreview = elements => ({
  type: PRESERVE_FOR_PREVIEW,
  elements
});
export const startNewForm = data => ({
  type: START_NEW_FORM,
  data
});

const handleError = (err, dispatch) => {
  if (err.response) {
    const error = err.response.data;
    return dispatch(setNotificationMessage(error.details, error.type, "error"));
  }
  dispatch(setNotificationMessage("Bad Network", "error"));
};

export const fetchForms = workspaceId => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`forms/workspaces/${workspaceId}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(saveForms(res.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const createForm = (details, history, to) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("forms", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateForms(res.data));
        dispatch(unpreserveFormForPreview());
        history.push(to);

        dispatch(
          setNotificationMessage(
            `${res.data.name} Form was created successfully`,
            "success"
          )
        );
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
