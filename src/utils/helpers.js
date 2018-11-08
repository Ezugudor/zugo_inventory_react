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

export const chunkData = (arr, amount) => {
  if (!Array.isArray(arr)) throw Error("Value given is not an array");
  const result = [];
  let currentChunk = [];
  arr.forEach(item => {
    if (currentChunk.length === amount) {
      result.push(currentChunk);
      currentChunk = [];
    }
    currentChunk.push(item);
  });
  result.push(currentChunk);
  return result;
};

export const slugName = text => {
  return text
    .toLowerCase()
    .split(" ")
    .join("-");
};
