import { UPDATE_CUSTOMERS } from "./types";

import {
  setNotificationMessage,
  startNetworkRequest,
  stopNetworkRequest
} from "./app";
import { SwypPartnerApi } from "../../core/api";
import { handleError } from "../../utils";

const updateEntity = data => ({ type: UPDATE_CUSTOMERS, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updateCustomersData = businessId => {
  // const details = { businessId };
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`business/customers`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateEntity(res.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const deleteCustomer = entity => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`business/customers/${entity.id}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateEntity(res.data.data));
        dispatch(
          setNotificationMessage(
            `Customer successfully deleted`,
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

export const addCustomer = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("business/customers", details)
      .then(res => {
        dispatch(stopNetworkRequest());

        dispatch(updateEntity(res.data.data));

        dispatch(
          setNotificationMessage(
            `Customer added successfully`,
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

export const updateCustomer = (id, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`business/customers/${id}`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateEntity(res.data.data));
        dispatch(
          setNotificationMessage(
            `Customer updated successfully`,
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
        dispatch(updateEntity(stocks.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
