import { UPDATE_BUSINESS, DELETE_USER, SAVE_STATS, SAVE_USER } from "./types";
import { SwypPartnerApi } from "../../core/api";
import { handleError } from "../../utils";
import {
  setNotificationMessage,
  startNetworkRequest,
  stopNetworkRequest
} from "./app";

const updateBusiness = data => ({ type: UPDATE_BUSINESS, data });
const deleteUser = user => ({ type: DELETE_USER, user });
const saveStats = stats => ({ type: SAVE_STATS, stats });
const saveUser = data => ({ type: SAVE_USER, data });

/**
 * handle user login interaction with backend service
 * @param {object} loginDetails user credentails
 * @param {object} history react router object
 */
export const loginUser = (loginDetails, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("businesses/loginuser", loginDetails)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(saveUser(res.data));
        dispatch(
          setNotificationMessage(
            `Welcome back ${res.data.user.name}`,
            "success"
          )
        );
        history.push("/dashboard");
      })
      .catch(err => handleError(err, dispatch));
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
        dispatch(saveUser(res.data));
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
    SwypPartnerApi.post("businesses/adduser", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateBusiness(res.data));
        dispatch(setNotificationMessage("User Added Successfully", "success"));
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * handle business manager's delete new team member interaction with bankend service
 * @param {object} user credentails of user to be delete
 */
export const deleteMember = user => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete("businesses/deleteuser", {
      data: { email: user.email }
    })
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(deleteUser(user));
        if (res.data.deleted) {
          dispatch(setNotificationMessage(`${user.name}, Deleted`, "success"));
          return;
        }
        dispatch(setNotificationMessage("Unable to delete user", "erro"));
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

export const getStats = () => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get("businesses/stats")
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(saveStats(res.data));
      })
      .catch(err => handleError(err, dispatch));
  };
};

export const requestPasswordReset = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("businesses/requestpasswordreset", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(setNotificationMessage(res.data.message, "success"));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const resetPassword = (details, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("businesses/resetpassword", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.updated) {
          dispatch(
            setNotificationMessage("Password Reset Successfully", "success")
          );
          history.push("/login");
          return;
        }
        dispatch(
          setNotificationMessage("Oops! could not reset password", "error")
        );
        history.push("requestpasswordreset");
      })
      .catch(err => handleError(err, dispatch));
  };
};

export const logoutUser = () => {
  localStorage.removeItem("swyp-state");
  window.location.reload();
};
