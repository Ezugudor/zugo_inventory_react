import {
  UPDATE_RECEIVINGS,
  UPDATE_STOCKS,
  UPDATE_DRIVERS,
  UPDATE_CUSTOMERS,
  SELECTED_CODE,
  SELECTED_CODE_SUPPLIES
} from "./types";

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

const updateCurrentCodeSupplyData = data => ({
  type: SELECTED_CODE_SUPPLIES,
  data
});
// const updateRxData = (data, id) => ({ type: UPDATE_RECEIVINGS, data, id });
// const updateStocks = data => ({ type: UPDATE_STOCKS, data });
// const updateCustomers = data => ({ type: UPDATE_CUSTOMERS, data });
// const updateDrivers = data => ({ type: UPDATE_DRIVERS, data });
// const updateCurrentCode = data => ({ type: SELECTED_CODE, data });
// const storeUserData = data => ({ type: STORE_USER, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updateCurrentSupplyData = code => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`business/supply/filter/${code}`)
      .then(res => {
        console.log("datat is here", res.data);
        dispatch(stopNetworkRequest());
        dispatch(updateCurrentCodeSupplyData(res.data));
        // dispatch(
        //   setNotificationMessage(`Redirecting...`, "success", "Retrieved")
        // );
        window.location.href = `/previewcode/${code}`;
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
export const updateSupplyData = businessId => {
  // const details = { businessId };
  const drivers = `business/${businessId}/drivers`;
  const customers = `business/${businessId}/customers`;
  const stocks = `business/${businessId}/stocks`;
  const receivings = `business/${businessId}/receivings`;
  return multipleRequest([
    SwypPartnerApi.get(drivers),
    SwypPartnerApi.get(stocks),
    SwypPartnerApi.get(receivings),
    SwypPartnerApi.get(customers)
  ]);
};

export const deleteSupply = elem => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`business/supply/${elem.id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        // dispatch(updateRxData(res.data.data));
        dispatch(
          setNotificationMessage(
            `Receivings successfully deleted`,
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

export const addSupply = (details, history) => {
  return dispatch => {
    console.log("supply details", details);
    dispatch(startNetworkRequest());
    SwypPartnerApi.post(`business/supply`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        // dispatch(updateRxData(res.data.data));
        // dispatch(updateDrivers(res.data.data));
        // dispatch(updateCustomers(res.data.data));

        dispatch(
          setNotificationMessage(
            `Code successfully processed`,
            "success",
            "Successful"
          )
        );
        history.push("/receivingsum");
      })
      .catch(err => {
        handleError(err, dispatch);
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
        // dispatch(updateDrivers(drivers.data));
        // dispatch(updateStocks(stocks.data));
        // dispatch(updateRxData(receivings.data));
        // dispatch(updateCustomers(customers.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
