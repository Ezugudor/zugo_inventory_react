import {
  DELETE_BUSINESS_ACCOUNT,
  STORE_USER,
  STORE_BUSINESS,
  UPDATE_BUSINESS
} from "./types";
import { startNetworkRequest, stopNetworkRequest } from "./app";
import { SwypPartnerApi } from "../../core/api";
import { setNotificationMessage } from "./app";
import { handleError } from "../../utils";

const deleteAcount = user => ({ type: DELETE_BUSINESS_ACCOUNT, user });
const storeBusinessrData = data => ({ type: STORE_BUSINESS, data });
const storeUserData = data => ({ type: STORE_USER, data });
const updateBusiness = data => ({ type: UPDATE_BUSINESS, data });

/**
 * handle user login interaction with backend service
 * @param {object} loginDetails user credentails
 * @param {object} history react router object
 */
export const loginUser = (loginDetails, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("admin/login", loginDetails)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(storeUserData(res.data));
        dispatch(storeBusinessrData(res.data));
        // dispatch(
        //   setNotificationMessage(
        //     `Welcome back ${res.data.user.name}`,
        //     "success"
        //   )
        // );
        history.push("/dashboard");
      })
      .catch(err => handleError(err, dispatch));
  };
};

export const verifySignupToken = token => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`user/completesignup/${token}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.valid) {
          dispatch(
            setNotificationMessage(`Token is valid`, "success", "Success !")
          );
          return;
        }
        dispatch(setNotificationMessage("Token has expired", "erro", "Oops !"));
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * handle user signup verification interaction with backend service
 * @param {object} loginDetails user credentails(password and confirm password)
 * @param {object} history react router object
 */
export const completeSignup = (loginDetails, history, _this) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post(
      `user/completesignup/${loginDetails.token}`,
      loginDetails
    )
      .then(res => {
        dispatch(stopNetworkRequest());

        _this.setState({
          currentComponent: "success"
        });

        //give some time margin so user can read the success message before redirecting to login
        setTimeout(function() {
          // window.location.href = "/login";
          history.push("/login");
        }, 5000);

        // dispatch(storeUserData(res.data));
        // dispatch(storeBusinessrData(res.data));
        dispatch(
          setNotificationMessage(
            "Account created successfully.",
            "success",
            `Welcome, ${res.data.user.name}`
          )
        );
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
    SwypPartnerApi.post("admin/add", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateBusiness(res.data));
        dispatch(
          setNotificationMessage(
            "User Added Successfully",
            "success",
            "Success !"
          )
        );
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
    SwypPartnerApi.put("admin/update", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(updateBusiness(res.data));
        dispatch(
          setNotificationMessage(
            "User info updated Successfully",
            "success",
            "Success !"
          )
        );
      })
      .catch(err => handleError(err, dispatch));
  };
};

/**
 * handle business manager's delete new team member interaction with bankend service
 * @param {object} member credentails of user to be delete
 */
export const deleteMember = member => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete("admin/delete", {
      data: { email: member.email }
    })
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(deleteAcount(member));
        dispatch(updateBusiness(res.data.business));
        if (res.data.deleted) {
          dispatch(
            setNotificationMessage(
              `User ${member.name}, deleted`,
              "success",
              "Success !"
            )
          );
          return;
        }
        dispatch(
          setNotificationMessage("Unable to delete user", "erro", "Oops !")
        );
      })
      .catch(err => handleError(err, dispatch));
  };
};

export const requestPasswordReset = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("admin/requestpasswordreset", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(
          setNotificationMessage(res.data.message, "success", "Success !")
        );
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const resetPassword = (details, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("admin/resetpassword", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.updated) {
          dispatch(
            setNotificationMessage(
              "Password Reset Successfully",
              "success",
              "Success !"
            )
          );
          history.push("/login");
          return;
        }
        dispatch(
          setNotificationMessage("could not reset password", "error", "Oops !")
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
