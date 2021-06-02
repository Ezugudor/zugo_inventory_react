import { UPDATE_OUTLETS } from "./types";

import {
  setNotificationMessage,
  startNetworkRequest,
  stopNetworkRequest
} from "./app";
import { SwypPartnerApi } from "../../core/api";
import { handleError } from "../../utils";

const updateEntity = data => ({ type: UPDATE_OUTLETS, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updateOutletsData = businessId => {
  // const details = { businessId };
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`business/outlets`)
      .then(res => {
        dispatch(stopNetworkRequest());
        /**
         * TODO: before you uncomment the line below, fix the returned json to
         * include INFO,SALES,CREDITS,PAYMENTS as it was during login so as not
         * to throw error going back to the dashboard
         **/
        console.log("outlet data", res.data);
        dispatch(updateEntity(res.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const deleteOutlet = entity => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`business/outlets/${entity.id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateEntity(res.data.data));
        dispatch(
          setNotificationMessage(
            `Outlet successfully deleted`,
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

export const addOutlet = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("business/outlets", details)
      .then(res => {
        dispatch(stopNetworkRequest());

        dispatch(updateEntity(res.data.data));

        dispatch(
          setNotificationMessage(
            `Outlet added successfully`,
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

export const updateOutlet = (id, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`business/outlets/${id}`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateEntity(res.data.data));
        dispatch(
          setNotificationMessage(
            `Outlet updated successfully`,
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
      .then(([drivers, stocks, receivings, outlets]) => {
        dispatch(stopNetworkRequest());
        dispatch(updateEntity(stocks.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
