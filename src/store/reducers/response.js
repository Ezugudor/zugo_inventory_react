import { updateState } from "../../utils";
import {
  SAVE_PROCESSED_RESPONSES,
  SAVE_PENDING_RESPONSES,
  SAVE_NOTED_RESPONSES
} from "../actions";

const initialState = {
  processed: { result: [], count: 0, pages: 0 },
  unread: { result: [], count: 0, pages: 0 },
  noted: { result: [], count: 0, pages: 0 }
};

export const response = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROCESSED_RESPONSES:
      return updateState(state, { processed: action.data });
    case SAVE_PENDING_RESPONSES:
      return updateState(state, { unread: action.data });
    case SAVE_NOTED_RESPONSES:
      return updateState(state, { noted: action.data });
    default:
      return state;
  }
};
