import { UPDATE_BUSINESS, STORE_USER, STORE_BUSINESS } from "./types";
import { startNetworkRequest, stopNetworkRequest } from "./app";
import { SwypPartnerApi } from "../../core/api";
import { setNotificationMessage } from "./app";
import { dropUploadedFile } from "./file";
import { handleError } from "../../utils";

const storeBusinessrData = data => ({ type: STORE_BUSINESS, data });
const updateBusiness = data => ({ type: UPDATE_BUSINESS, data });
const storeUserData = data => ({ type: STORE_USER, data });
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
          setNotificationMessage(`Your Swyp account has been setup`, "success")
        );
        history.push("/settings");
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * handle business manager's create new team member interaction with bankend service
 * @param {object} details credentails of new user to be created
 */
export const createNewMember = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("user/add", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateBusiness(res.data));
        dispatch(setNotificationMessage("User Added Successfully", "success"));
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * Handle business manage's change of user account branche information
 * @param {object} details payload of info for the server
 */
export const changeBranch = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put("businesses/updatebranch", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateBusiness(res.data));
        dispatch(
          setNotificationMessage("Branch changed Successfully", "success")
        );
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
        dispatch(
          setNotificationMessage("Branch changed Successfully", "success")
        );
        dispatch(dropUploadedFile());
        history.push("/team");
      })
      .catch(err => handleError(err, dispatch));
  };
};
