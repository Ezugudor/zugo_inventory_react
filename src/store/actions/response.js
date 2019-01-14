import { SwypPartnerApi } from "../../core/api";
import { handleError } from "../../utils";
import {
  SAVE_PROCESSED_RESPONSES,
  SAVE_PENDING_RESPONSES,
  UPDATE_RESPONSE_NOTE
} from "./types";
import {
  setNotificationMessage,
  startNetworkRequest,
  stopNetworkRequest
} from "./app";

export const fetchResponseByStatus = businessId => {
  const processedUrl = `responses/bystatus/processed?business=${businessId}`;
  const pendingUrl = `responses/bystatus/pending?business=${businessId}`;
  return multipleRequest([
    SwypPartnerApi.get(processedUrl),
    SwypPartnerApi.get(pendingUrl)
  ]);
};

export const filterByDate = (id, from, to) => {
  const processedUrl = `responses/bystatus/processed?business=${id}&from=${from}&to=${to}`;
  const pendingUrl = `responses/bystatus/pending?business=${id}&from=${from}&to=${to}`;
  return multipleRequest([
    SwypPartnerApi.get(processedUrl),
    SwypPartnerApi.get(pendingUrl)
  ]);
};

export const createNote = (responseId, note, type) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post(`responses/addnote/${responseId}`, { note })
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateResponse(res.data, type));
        return dispatch(
          dispatch(setNotificationMessage("Note added", "success"))
        );
      })
      .catch(err => handleError(err, dispatch));
  };
};

export const processResponse = (id, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`responses/process/${id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.updated) {
          history.push("/dashboard");
          return dispatch(
            setNotificationMessage("Response Processed Successfully", "success")
          );
        }
        dispatch(
          setNotificationMessage("We are unable to process response", "error")
        );
      })
      .catch(err => handleError(err, dispatch));
  };
};

const multipleRequest = (urls = []) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    Promise.all(urls)
      .then(([pro, pen]) => {
        dispatch(stopNetworkRequest());
        dispatch(saveProcessedResponses(pro.data));
        dispatch(savePendingResponse(pen.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

const saveProcessedResponses = data => ({
  type: SAVE_PROCESSED_RESPONSES,
  data
});

const updateResponse = (data, type) => ({
  type: UPDATE_RESPONSE_NOTE,
  data,
  stateType: type
});

const savePendingResponse = data => ({
  type: SAVE_PENDING_RESPONSES,
  data
});
