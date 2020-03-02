import { UPDATE_STOCKS } from "./types";

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

const updateStocks = data => ({ type: UPDATE_STOCKS, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updateStocksData = businessId => {
  // const details = { businessId };
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`business/${businessId}/stocks`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateStocks(res.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const deleteStock = stockElem => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`business/stocks/${stockElem.id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateStocks(res.data.data));
        dispatch(
          setNotificationMessage(
            `Stock successfully deleted`,
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

export const addStock = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("business/stocks", details)
      .then(res => {
        dispatch(stopNetworkRequest());

        dispatch(updateStocks(res.data.data));

        dispatch(
          setNotificationMessage(
            `Stock added successfully`,
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

export const updateStock = (id, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`business/stocks/${id}`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateStocks(res.data.data));
        dispatch(
          setNotificationMessage(
            `Stock updated successfully`,
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
      .then(([drivers, stocks, receivings, customers]) => {
        dispatch(stopNetworkRequest());
        dispatch(updateStocks(stocks.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
