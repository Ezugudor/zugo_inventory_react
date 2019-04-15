import { HOLD_UPLOADED_FILE_URL, DROP_UPLOADED_FILE_URL } from "./types";
import { stopNetworkRequest, startNetworkRequest } from "./app";
import { SwypPartnerApi } from "../../core/api";
import { UPDATE_UPLOAD_STATUS } from "./types";
import { handleError } from "../../utils";

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
 * upload logo to backend server
 * @param {FormData} formData object containing the file to be uploaded
 * @param {string} fileName name of the file to be uploaded
 */
export const uploadLogo = (formData, filename) => {
  return dispatch => {
    const url = `upload/logos/${filename}`;
    uploadFile(url, formData, dispatch);
  };
};

/**
 * upload official signatures to backend server
 * @param {FormData} formData object containing the file to be uploaded
 * @param {string} bankName name of bank whose workers signature need to be processed
 * @param {string} fileName name of the file to be uploaded
 */
export const uploadOfficialSigns = (formData, bankName, filename) => {
  return dispatch => {
    const url = `upload/official-signatures/${bankName}/${filename}`;
    return uploadFile(url, formData, dispatch);
  };
};

/**
 * send a file to the backend for processing
 * @param {string} url backend server url to send payload to
 * @param {FormData} formData object containing the file to be uploaded
 * @param {reduxEventDispatcher} dispatch
 */
const uploadFile = (url, formData, dispatch) => {
  dispatch(startNetworkRequest());
  dispatch(updateUploadStatus("uploading"));
  return SwypPartnerApi.post(url, formData)
    .then(res => {
      dispatch(stopNetworkRequest());
      dispatch(holdFile(res.data));
      dispatch(updateUploadStatus(""));
    })
    .catch(err => {
      dispatch(updateUploadStatus(""));
      handleError(err, dispatch);
    });
};
