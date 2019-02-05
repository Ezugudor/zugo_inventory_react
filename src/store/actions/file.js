import { HOLD_UPLOADED_FILE_URL, DROP_UPLOADED_FILE_URL } from "./types";
import { stopNetworkRequest, startNetworkRequest } from "./app";
import { UPDATE_UPLOAD_STATUS } from "./types";

import { SwypPartnerApi } from "../../core/api";
import { handleError } from "../../utils";

/**
 * different server urls while files can be uploaded at
 */
const urls = {
  signature: "upload/signature",
  passport: "upload/passport",
  logo: "upload/logos"
};

/**
 * Temporarily store information about an uploaded file
 * @param {object} data object containing information about the uploaded file
 */
const holdFile = data => ({ type: HOLD_UPLOADED_FILE_URL, data });

/**
 * Get rid of the uploaded file in storage
 */
export const dropUploadedFile = () => ({ type: DROP_UPLOADED_FILE_URL });

/**
 * change the status of a file upload action
 * @param {string} status new upload status
 */
export const updateUploadStatus = status => ({
  type: UPDATE_UPLOAD_STATUS,
  status
});

/**
 * send a file to the backend for processing
 * @param {string} fileType type of file to be uploaded
 * @param {FormData} formData object containing the file to be uploaded
 * @param {string} fileName name of the file to be uploaded
 */
export const uploadFile = (fileType, formData, fileName) => {
  const url = `${urls[fileType]}/${fileName}`;
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post(url, formData)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(holdFile(res.data));
        dispatch(updateUploadStatus("uploaded"));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
