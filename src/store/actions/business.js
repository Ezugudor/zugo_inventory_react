import {
  UPDATE_BUSINESS,
  STORE_USER,
  STORE_BUSINESS,
  DELETE_BUSINESS_BRANCH,
  SAVE_ALL_BUSINESSES,
  SAVE_APPROVED_BUSINESSES,
  SAVE_INACTIVE_BUSINESSES
} from "./types";
import { startNetworkRequest, stopNetworkRequest } from "./app";
import { SwypPartnerApi } from "../../core/api";
import { setNotificationMessage } from "./app";
import { dropUploadedFile } from "./file";
import { handleError } from "../../utils";

const storeBusinessrData = data => ({ type: STORE_BUSINESS, data });
const updateBusiness = data => ({ type: UPDATE_BUSINESS, data });
const storeUserData = data => ({ type: STORE_USER, data });
const deleteStoredBranch = data => ({ type: DELETE_BUSINESS_BRANCH, data });
const saveAllBusinesses = data => ({
  type: SAVE_ALL_BUSINESSES,
  data
});

const saveApprovedBusinesses = data => ({
  type: SAVE_APPROVED_BUSINESSES,
  data
});

const saveInactiveBusinesses = data => ({
  type: SAVE_INACTIVE_BUSINESSES,
  data
});

/**
 * Fetch form responses of a business
 * @param {string} businessId id of business whose form responses needs fetching
 */
export const fetchBusinessByStatus = () => {
  const allBusinessUrl = `businesses/bystatus/all`;
  const approvedUrl = `businesses/bystatus/approved`;
  const inactiveUrl = `businesses/bystatus/inactive`;
  return multipleRequest([
    SwypPartnerApi.get(allBusinessUrl),
    SwypPartnerApi.get(approvedUrl),
    SwypPartnerApi.get(inactiveUrl)
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
          dispatch(fetchBusinessByStatus());
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
          dispatch(fetchBusinessByStatus());
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
        dispatch(storeUserData(res.data));
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
      .then(([all, approved, inactive]) => {
        dispatch(stopNetworkRequest());
        dispatch(saveAllBusinesses(all.data));
        dispatch(saveApprovedBusinesses(approved.data));
        dispatch(saveInactiveBusinesses(inactive.data));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
