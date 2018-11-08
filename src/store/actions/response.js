import { SwypPartnerApi } from "../../core/api";
import { handleError } from "../../utils";
import {
  setNotificationMessage,
  startNetworkRequest,
  stopNetworkRequest
} from "./app";
import {
  SAVE_PROCESSED_RESPONSES,
  SAVE_PENDING_RESPONSES,
  SAVE_NOTED_RESPONSES
} from "./types";

const saveProcessedResponses = data => ({
  type: SAVE_PROCESSED_RESPONSES,
  data
});

const savePendingResponse = data => ({
  type: SAVE_PENDING_RESPONSES,
  data
});

const saveNotedResponse = data => ({
  type: SAVE_NOTED_RESPONSES,
  data
});

const find = (collection, id) => {
  return collection.find(item => item._id === id);
};

export const getContent = (id, type, state) => {
  if (type === "unread") {
    return find(state.response.unread.result, id);
  }
  if (type === "withnotes") {
    return find(state.response.noted.result, id);
  }
  if (type === "processed") {
    return find(state.response.processed.result, id);
  }
  return null;
};

export const all = businessId => {
  const processedUrl = `responses/bystatus/processed?business=${businessId}`;
  const pendingUrl = `responses/bystatus/pending?business=${businessId}`;
  const notedUrl = `responses/bystatus/noted?business=${businessId}`;

  const processedRequest = SwypPartnerApi.get(processedUrl);
  const pendingRequest = SwypPartnerApi.get(pendingUrl);
  const notedRequest = SwypPartnerApi.get(notedUrl);
  return multipleRequest([processedRequest, pendingRequest, notedRequest]);
};

export const filterByDate = (id, from, to) => {
  const processedUrl = `responses/bystatus/processed?business=${id}&from=${from}&to=${to}`;
  const pendingUrl = `responses/bystatus/pending?business=${id}&from=${from}&to=${to}`;
  const notedUrl = `responses/bystatus/noted?business=${id}&from=${from}&to=${to}`;

  const processedRequest = SwypPartnerApi.get(processedUrl);
  const pendingRequest = SwypPartnerApi.get(pendingUrl);
  const notedRequest = SwypPartnerApi.get(notedUrl);
  return multipleRequest([processedRequest, pendingRequest, notedRequest]);
};

export const createNote = (responseId, note, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post(`responses/addnote/${responseId}`, { note })
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.updated) {
          history.push("/dashboard");
          return dispatch(
            dispatch(setNotificationMessage("Note added", "success"))
          );
        }
        dispatch(
          setNotificationMessage("We are unable to process response", "error")
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
      .then(([pro, pen, not]) => {
        dispatch(stopNetworkRequest());
        dispatch(saveProcessedResponses(pro.data));
        dispatch(savePendingResponse(pen.data));
        dispatch(saveNotedResponse(not.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
