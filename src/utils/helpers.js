import { setNotificationMessage, stopNetworkRequest } from "../store/actions";

export const handleError = (err, dispatch) => {
  dispatch(stopNetworkRequest());

  if (err.response) {
    const error = err.response.data;
    dispatch(setNotificationMessage(error.details, "error"));
    return;
  }
  dispatch(setNotificationMessage("Oops request failed", "error"));
};

export const calculateElementCount = formInputs => {
  return formInputs.filter(element => element.type !== "section").length;
};
