import {
  UPDATE_RECEIVINGS,
  UPDATE_STOCKS,
  UPDATE_DRIVERS,
  UPDATE_CUSTOMERS
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

const updateRxData = (data, id) => ({ type: UPDATE_RECEIVINGS, data, id });
const updateStocks = data => ({ type: UPDATE_STOCKS, data });
const updateCustomers = data => ({ type: UPDATE_CUSTOMERS, data });
const updateDrivers = data => ({ type: UPDATE_DRIVERS, data });
// const storeUserData = data => ({ type: STORE_USER, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updateReceivingsData = businessId => {
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

export const deleteReceivings = elem => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`business/receivings/${elem.id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateRxData(res.data.data));
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

export const addEntity = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("business/receivings", details)
      .then(res => {
        dispatch(stopNetworkRequest());

        dispatch(updateRxData(res.data.data));
        dispatch(updateDrivers(res.data.data));
        dispatch(updateCustomers(res.data.data));

        dispatch(
          setNotificationMessage(
            `Code added successfully`,
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

export const processCode = (details, id) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`business/receivings/${id}`, details)
      .then(res => {
        console.log("processcode", res);
        dispatch(stopNetworkRequest());
        dispatch(updateRxData(res.data.data));
        dispatch(updateDrivers(res.data.data));
        dispatch(updateCustomers(res.data.data));
        dispatch(
          setNotificationMessage(
            `Code successfully processed`,
            "success",
            "Successful"
          )
        );
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const updateForm = (details, history, { to, params }, autoSave) => {
  return dispatch => {
    autoSave
      ? dispatch(startAutoSaveNetworkRequest())
      : dispatch(startNetworkRequest());

    SwypPartnerApi.put("forms", details)
      .then(res => {
        if (autoSave) {
          dispatch(stopAutoSaveNetworkRequest());
          const { formTypeId } = details;
          // dispatch(updateForms(res.data, formTypeId));
          dispatch(
            setAutoSaveNotificationMessage(
              `${res.data.name} saved successfully`,
              "success",
              "Saved"
            )
          );
          return;
        }
        dispatch(stopNetworkRequest());
        // dispatch(unpreserveFormBuilderState());
        // dispatch(unpreserveNewForm());
        const { formTypeId } = details;
        // dispatch(updateForms(res.data, formTypeId));
        dispatch(
          setNotificationMessage(
            `${res.data.name} updated successfully`,
            "success",
            "Success"
          )
        );
        history.push(to, { params });
      })
      .catch(err => {
        if (err.response.status == 502) {
          dispatch(stopNetworkRequest());
          if (!autoSave) {
            dispatch(
              setNotificationMessage(
                "You have not really made any changes.",
                "success",
                "Nothing Changed"
              )
            );
          }
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
        dispatch(updateDrivers(drivers.data));
        dispatch(updateStocks(stocks.data));
        dispatch(updateRxData(receivings.data));
        dispatch(updateCustomers(customers.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
