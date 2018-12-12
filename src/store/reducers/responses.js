import { SAVE_PROCESSED_RESPONSES, SAVE_PENDING_RESPONSES } from "../actions";
import { updateState } from "../../utils";

const initialState = {
  processed: { result: [], count: 0, pages: 0 },
  unread: { result: [], count: 0, pages: 0 }
};

export const responses = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROCESSED_RESPONSES:
      return updateState(state, { processed: action.data });
    case SAVE_PENDING_RESPONSES:
      return updateState(state, { unread: action.data });
    default:
      return state;
  }
};
