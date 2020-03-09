import { UPDATE_CREDIT } from "./types";

import {
  setNotificationMessage,
  setAutoSaveNotificationMessage,
  startNetworkRequest,
  startAutoSaveNetworkRequest,
  stopNetworkRequest,
  stopAutoSaveNetworkRequest
} from "./app";
import { SwypPartnerApi } from "../../core/api";
import { handleError } from "../../utils";

const updateCredits = data => ({ type: UPDATE_CREDIT, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updateCreditsData = businessId => {
  // const details = { businessId };
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`business/customer-credit`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateCredits(res.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const deleteCredit = elem => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`business/customer-credit/${elem.id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateCredits(res.data.data));
        dispatch(
          setNotificationMessage(
            `Credit successfully deleted`,
            "success",
            "Success"
          )
        );
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const addCredit = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("business/customer-credit", details)
      .then(res => {
        dispatch(stopNetworkRequest());

        dispatch(updateCredits(res.data.data));

        dispatch(
          setNotificationMessage(
            `Credit added successfully`,
            "success",
            `Success`
          )
        );
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const updateCredit = (id, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`business/customer-credit`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateCredits(res.data.data));
        dispatch(
          setNotificationMessage(
            `Credit updated successfully`,
            "success",
            "Success"
          )
        );
      })
      .catch(err => {
        if (err.response.status == 502) {
          dispatch(stopNetworkRequest());

          dispatch(
            setNotificationMessage(
              "You have not really made any changes.",
              "success",
              "Nothing Changed"
            )
          );
        }
      });
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
      .then(([credit, stocks, receivings, customers]) => {
        dispatch(stopNetworkRequest());
        dispatch(updateCredits(stocks.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
