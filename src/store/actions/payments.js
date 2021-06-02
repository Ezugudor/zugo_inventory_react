import { UPDATE_PAYMENT, UPDATE_CREDIT } from "./types";

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

const updatePayments = data => ({ type: UPDATE_PAYMENT, data });
const updateCredits = data => ({ type: UPDATE_CREDIT, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updatePaymentsData = businessId => {
  // const details = { businessId };
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`business/credit-payment`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updatePayments(res.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const deletePayment = elem => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`business/credit-payment/${elem.id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updatePayments(res.data.data));
        dispatch(
          setNotificationMessage(
            `Payment successfully deleted`,
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

export const addPayment = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("business/credit-payment", details)
      .then(res => {
        dispatch(stopNetworkRequest());

        dispatch(updateCredits(res.data.data));

        dispatch(
          setNotificationMessage(
            `Payment added successfully`,
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

export const updatePayment = (id, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`business/credit-payment`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updatePayments(res.data.data));
        dispatch(
          setNotificationMessage(
            `Payment updated successfully`,
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
      .then(([payments, stocks, receivings, customers]) => {
        dispatch(stopNetworkRequest());
        dispatch(updatePayments(stocks.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
