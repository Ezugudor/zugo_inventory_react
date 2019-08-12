import { DELETE_BUSINESS_ACCOUNT, STORE_USER, STORE_BUSINESS } from "./types";
import { startNetworkRequest, stopNetworkRequest } from "./app";
import { SwypPartnerApi } from "../../core/api";
import { setNotificationMessage } from "./app";
import { handleError } from "../../utils";

const deleteAcount = user => ({ type: DELETE_BUSINESS_ACCOUNT, user });
const storeBusinessrData = data => ({ type: STORE_BUSINESS, data });
const storeUserData = data => ({ type: STORE_USER, data });

/**
 * handle user login interaction with backend service
 * @param {object} loginDetails user credentails
 * @param {object} history react router object
 */
export const loginUser = (loginDetails, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("user/login", loginDetails)
      .then(res => {
        dispatch(stopNetworkRequest());
        console.log("on login store user data", res.data);
        dispatch(storeUserData(res.data));
        dispatch(storeBusinessrData(res.data));
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

export const verifySignupToken = token => {
  return dispatch => {
    // dispatch(startNetworkRequest());
    SwypPartnerApi.get(`user/completesignup/${token}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.valid) {
          dispatch(setNotificationMessage(`Token is valid`, "success"));
          return;
        }
        dispatch(setNotificationMessage("Token has expired", "erro"));
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
            `Welcome back ${res.data.user.name}`,
            "success"
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
    SwypPartnerApi.delete("user/delete", {
      data: { email: member.email }
    })
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(deleteAcount(member));
        if (res.data.deleted) {
          dispatch(
            setNotificationMessage(`${member.name}, Deleted`, "success")
          );
          return;
        }
        dispatch(setNotificationMessage("Unable to delete user", "erro"));
      })
      .catch(err => handleError(err, dispatch));
  };
};

export const requestPasswordReset = details => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("user/requestpasswordreset", details)
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
    SwypPartnerApi.post("user/resetpassword", details)
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
