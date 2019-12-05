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
export const uploadLogo = (formData, filename, _this) => {
  return dispatch => {
    const url = `upload/logos/${filename}`;
    return uploadFile(url, formData, dispatch, _this);
  };
};

/**
 * upload official signatures to backend server
 * @param {FormData} formData object containing the file to be uploaded
 * @param {string} bankName name of bank whose workers signature need to be processed
 * @param {string} fileName name of the file to be uploaded
 */
export const uploadOfficialSigns = (formData, bankName, filename, _this) => {
  return dispatch => {
    const url = `upload/official-signatures/${bankName}/${filename}`;
    return uploadFile(url, formData, dispatch, _this);
  };
};

/**
 * send a file to the backend for processing
 * @param {string} url backend server url to send payload to
 * @param {FormData} formData object containing the file to be uploaded
 * @param {reduxEventDispatcher} dispatch
 */
const uploadFile = (url, formData, dispatch, _this) => {
  // dispatch(startNetworkRequest()); //disabled this for file uploads so progress bar could shine :)
  dispatch(updateUploadStatus("uploading"));
  return SwypPartnerApi.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: eve => {
      let total = eve.total;
      let loaded = eve.loaded;
      let fraction = eve.loaded / eve.total;
      // let percS = Math.floor(fraction * 100) + "%";
      let perc = Math.floor(fraction * 100);
      _this.setState({ loading: perc });
      var pb = document.querySelector(".pb-cont .pb-inside");
      if (loaded >= total) {
        // pb.style.width = "100%";
      } else {
        // pb.style.width = perc;
      }
    }
  })
    .then(res => {
      // dispatch(stopNetworkRequest());
      dispatch(holdFile(res.data));
      dispatch(updateUploadStatus(""));
    })
    .catch(err => {
      dispatch(updateUploadStatus(""));
      handleError(err, dispatch);
    });
};
