import { SAVE_PROCESSED_RESPONSES, SAVE_PENDING_RESPONSES } from "./types";
import { setNotificationMessage, startNetworkRequest } from "./app";
import { SAVE_PARTIALLYPROCESSED_RESPONSES } from "./types";
import { SwypPartnerApi } from "../../core/api";
import { UPDATE_RESPONSE_NOTE } from "./types";
import { stopNetworkRequest } from "./app";
import { handleError } from "../../utils";

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const fetchResponseByStatus = businessId => {
  const partialUrl = `responses/bystatus/partiallyprocessed?business=${businessId}`;
  const processedUrl = `responses/bystatus/processed?business=${businessId}`;
  const pendingUrl = `responses/bystatus/pending?business=${businessId}`;
  return multipleRequest([
    SwypPartnerApi.get(processedUrl),
    SwypPartnerApi.get(pendingUrl),
    SwypPartnerApi.get(partialUrl)
  ]);
};

/**
 * fetch a businesses form responses that came in within two date period
 * @param {string} id id of business whose form responses needs fetching
 * @param {datestring} from the date to mark the start date we are interested in
 * @param {datestring} to the date to mark the end date we are interested in
 */
export const filterByDate = (id, from, to) => {
  const partialUrl = `responses/bystatus/partiallyprocessed?business=${id}&from=${from}&to=${to}`;
  const processedUrl = `responses/bystatus/processed?business=${id}&from=${from}&to=${to}`;
  const pendingUrl = `responses/bystatus/pending?business=${id}&from=${from}&to=${to}`;
  return multipleRequest([
    SwypPartnerApi.get(processedUrl),
    SwypPartnerApi.get(pendingUrl),
    SwypPartnerApi.get(partialUrl)
  ]);
};

/**
 * Leave a note on a form responsne
 * @param {string} responseId id of responses that a bank worker want to leave note on
 * @param {string} note the note a bank worker want to leave on a form response
 * @param {string} type the category the response belongs to pending/processed/partiallyprocessed
 */
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

/**
 *
 * @param {string} id id of form response that an official is signing off on
 * @param {object} details request payload
 * @param {string} type the category the response belongs to pending/processed/partiallyprocessed
 */
export const signOff = (id, details, type) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    return SwypPartnerApi.put(`responses/signoff/${id}`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateResponse(res.data, type));
        return dispatch(
          setNotificationMessage("Response Processed Successfully", "success")
        );
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * make multiple network request in parallel
 * @param {array} urls endpoints to make network request to
 */
const multipleRequest = (urls = []) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    Promise.all(urls)
      .then(([pro, pen, partial]) => {
        dispatch(stopNetworkRequest());
        dispatch(savePartillayProcessed(partial.data));
        dispatch(saveProcessedResponses(pro.data));
        dispatch(savePendingResponse(pen.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

const savePartillayProcessed = data => ({
  type: SAVE_PARTIALLYPROCESSED_RESPONSES,
  data
});

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
