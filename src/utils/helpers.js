import { setNotificationMessage, stopNetworkRequest } from "../store/actions";

export const handleError = (err, dispatch) => {
  dispatch(stopNetworkRequest());

  if (err.response) {
    const error = err.response.data;
    console.log("error details", error);
    dispatch(setNotificationMessage(error.details, "error", "Oaops !"));
    return;
  }
  dispatch(setNotificationMessage("Oops request failed", "error", "Oops !"));
};

export const calculateElementCount = formInputs => {
  return formInputs.filter(
    element => element.type !== "section" && element.type !== "introduction"
  ).length;
};

export const chunkData = (arr, amount) => {
  if (!Array.isArray(arr)) return [];
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
