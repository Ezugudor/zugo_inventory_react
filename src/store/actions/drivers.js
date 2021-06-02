import { UPDATE_DRIVERS } from "./types";

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

const updateDrivers = data => ({ type: UPDATE_DRIVERS, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updateDriversData = businessId => {
  // const details = { businessId };
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`business/drivers`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateDrivers(res.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const deleteDriver = stockElem => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`business/drivers/${stockElem.id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateDrivers(res.data.data));
        dispatch(
          setNotificationMessage(
            `Driver successfully deleted`,
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

export const addDriver = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("business/drivers", details)
      .then(res => {
        dispatch(stopNetworkRequest());

        dispatch(updateDrivers(res.data.data));

        dispatch(
          setNotificationMessage(
            `Driver added successfully`,
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

export const updateDriver = (id, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`business/drivers`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateDrivers(res.data.data));
        dispatch(
          setNotificationMessage(
            `Driver updated successfully`,
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
        dispatch(updateDrivers(stocks.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
