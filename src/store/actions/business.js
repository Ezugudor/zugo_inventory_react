import {
  UPDATE_BUSINESS,
  STORE_USER,
  STORE_BUSINESS,
  DELETE_BUSINESS_BRANCH
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
 * handle business manager's create new Branch interaction with bankend service
 * @param {object} details credentails of new branch to be created
 */
export const createNewBranch = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("branch/add", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateBusiness(res.data));
        dispatch(
          setNotificationMessage("Branch Added Successfully", "success")
        );
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * handle business manager's delete branch interaction with bankend service
 * @param {object} branch credentails of the branch to be delete
 */
export const deleteBranch = branch => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete("branch/delete", {
      data: { name: branch.name }
    })
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(deleteStoredBranch(branch));
        // alert(res.data.deleted);
        // return;
        if (res.data.deleted) {
          dispatch(
            setNotificationMessage(`${branch.name}, Deleted`, "success")
          );
          return;
        }
        dispatch(setNotificationMessage("Unable to delete branch", "erro"));
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * Handle business manage's change of user account information
 * @param {object} details payload of info for the server
 */
export const updateUser = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put("businesses/updateuser", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateBusiness(res.data));
        // console.log("detail", details);
        // console.log("res", res);
        if (res.status == 200) {
          alert(`user (${details.firstname}) detail changed successfuly`);
        }
        dispatch(
          setNotificationMessage("aBranch changed Successfully", "success")
        );
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * Handle business manage's change of branch information
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
          setNotificationMessage("vBranch changed Successfully", "success")
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
        dispatch(updateBusiness(details));

        console.log("dispactch data", details);
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
