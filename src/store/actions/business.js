import { UPDATE_BUSINESS, STORE_BUSINESS } from "./types";
import {
  UPDATE_OUTLETS,
  UPDATE_CUSTOMERS,
  UPDATE_CREDIT,
  UPDATE_PAYMENT
} from "./types";
import { startNetworkRequest, stopNetworkRequest } from "./app";
import { SwypPartnerApi } from "../../core/api";
import { setNotificationMessage } from "./app";
import { dropUploadedFile } from "./file";
import { handleError } from "../../utils";

const storeBusinessrData = data => ({ type: STORE_BUSINESS, data });
const updateBusiness = data => ({ type: UPDATE_BUSINESS, data });
const updateOutlets = data => ({ type: UPDATE_OUTLETS, data });
const updateCustomers = data => ({ type: UPDATE_CUSTOMERS, data });
const updateCredit = data => ({ type: UPDATE_CREDIT, data });
const updatePayment = data => ({ type: UPDATE_PAYMENT, data });
// const storeUserData = data => ({ type: STORE_USER, data });

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const updateBusinessDataFromServer = businessId => {
  // const details = { businessId };
  const outlets = `business/outlets`;
  const customers = `business/customers`;
  const credit = `business/customer-credit`;
  const payment = `business/credit-payment`;
  return multipleRequest([
    SwypPartnerApi.get(outlets),
    SwypPartnerApi.get(credit),
    SwypPartnerApi.get(payment),
    SwypPartnerApi.get(customers)
  ]);
};

/**
 * Approves/Disapprove a business.
 * @param {string} businessId
 * @param {object} details
 */
export const approveBusiness = (businessId, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`businesses/approve/${businessId}`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.updated) {
          // dispatch(fetchBusinessByStatus());
        }
        dispatch(
          setNotificationMessage(
            `Action completed successfully`,
            "success",
            "Success"
          )
        );
        return true;
      })
      .catch(err => {
        handleError(err, dispatch);
        return "sf";
      });
  };
};

/**
 * Activate/Deactivate a business.
 * @param {string} businessId
 * @param {object} details
 */
export const activateBusiness = (businessId, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`businesses/activate/${businessId}`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.updated) {
          // dispatch(fetchBusinessByStatus());
        }
        dispatch(
          setNotificationMessage(
            `Action completed successfully`,
            "success",
            "Success"
          )
        );
        return true;
      })
      .catch(err => {
        handleError(err, dispatch);
        return "sf";
      });
  };
};

/**
 * handle user's business registration interaction with backend service
 * @param {object} details business and business manager credentials
 *  * @param {object} history react router object
 */
export const registerBusiness = (details, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("businesses", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        // dispatch(storeUserData(res.data));
        dispatch(storeBusinessrData(res.data));
        dispatch(
          setNotificationMessage(
            `Swyp account (${res.data.business.name}) has been successfully setup. `,
            "success",
            "Success !"
          )
        );
        console.log("result from create", res);
        setTimeout(function() {
          //delay a little so we can see the notification above.
          // window.location.href = `/business/settings/${res.data.business.id}`;
          // history.push(`/business/settings/${res.data.business.id}`);
        }, 3000);
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * Handle business manage's change of user account branche information
 * @param {object} details payload of info for the server
 */
export const updateDetails = (details, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put("businesses/updatedetails", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateBusiness(details));
        dispatch(
          setNotificationMessage(
            "Settings saved Successfully",
            "success",
            "Success !"
          )
        );
        dispatch(dropUploadedFile());
        // history.push("/team");
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
      .then(([outlets, credit, payment, customers]) => {
        dispatch(stopNetworkRequest());
        dispatch(updateOutlets(outlets.data));
        dispatch(updateCredit(credit.data));
        dispatch(updatePayment(payment.data));
        dispatch(updateCustomers(customers.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
