import { HOLD_UPLOADED_FILE_URL, DROP_UPLOADED_FILE_URL } from "../actions";
import { UPDATE_UPLOAD_STATUS } from "../actions";
import { updateState } from "../../utils";

const initialState = { data: null, uploadStatus: "" };

/**
 * reducer for file objecct stored in a redux state object
 * @param {object} state redux state tree
 * @param {object } action redux action object
 */
export const file = (state = initialState, action) => {
  switch (action.type) {
    case HOLD_UPLOADED_FILE_URL: {
      return updateState(state, { data: action.data });
    }
    case DROP_UPLOADED_FILE_URL: {
      return updateState(state, initialState);
    }
    case UPDATE_UPLOAD_STATUS: {
      return updateState(state, { uploadStatus: action.status });
    }
    default:
      return state;
  }
};
